import { unstable_cache } from "next/cache";
import { NextResponse } from "next/server";
import axios from "axios";
import type { MonkeytypeSummary } from "@/features/about/types/monkeytype";

type MonkeytypePersonalBest = {
  acc?: number;
  consistency?: number;
  language?: string;
  wpm?: number;
};

type MonkeytypePersonalBestsResponse = {
  data?: MonkeytypePersonalBest | MonkeytypePersonalBest[] | null;
};

type MonkeytypeStatsResponse = {
  data?: {
    completedTests?: number;
  };
};

const unavailable: MonkeytypeSummary = {
  personalBest: null,
  completedTests: null,
};

const testDuration = 60;

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

const getMonkeytypeSummary = unstable_cache(
  async (): Promise<MonkeytypeSummary> => {
    const apeKey = process.env.MONKEYTYPE_APE_KEY;

    const headers = {
      Authorization: `ApeKey ${apeKey}`,
    };

    const [personalBestsResult, statsResult] = await Promise.allSettled([
      axios.get<MonkeytypePersonalBestsResponse>("https://api.monkeytype.com/users/personalBests", {
        headers,
        params: { mode: "time", mode2: testDuration },
        timeout: 10_000,
      }),
      axios.get<MonkeytypeStatsResponse>("https://api.monkeytype.com/users/stats", {
        headers,
        timeout: 10_000,
      }),
    ]);

    if (personalBestsResult.status === "rejected" && statsResult.status === "rejected") {
      throw new Error("Monkeytype API requests failed");
    }

    const personalBestData = personalBestsResult.status === "fulfilled" ? personalBestsResult.value.data.data : null;
    const personalBests = Array.isArray(personalBestData)
      ? personalBestData
      : personalBestData
        ? [personalBestData]
        : [];
    const personalBest = personalBests
      .filter(
        (result) => isFiniteNumber(result.wpm) && isFiniteNumber(result.acc) && isFiniteNumber(result.consistency),
      )
      .sort((first, second) => (second.wpm ?? 0) - (first.wpm ?? 0))[0];
    const stats = statsResult.status === "fulfilled" ? statsResult.value.data.data : null;

    if (!personalBest && !isFiniteNumber(stats?.completedTests)) {
      throw new Error("Monkeytype summary data is unavailable");
    }

    return {
      personalBest:
        personalBest &&
        isFiniteNumber(personalBest.wpm) &&
        isFiniteNumber(personalBest.acc) &&
        isFiniteNumber(personalBest.consistency)
          ? {
              wpm: personalBest.wpm,
              accuracy: personalBest.acc,
              consistency: personalBest.consistency,
              language: personalBest.language || "English",
              duration: testDuration,
            }
          : null,
      completedTests: isFiniteNumber(stats?.completedTests) ? stats.completedTests : null,
    };
  },
  ["monkeytype-summary"],
  { revalidate: 3600 },
);

export async function GET() {
  if (!process.env.MONKEYTYPE_APE_KEY) return NextResponse.json(unavailable);

  try {
    return NextResponse.json(await getMonkeytypeSummary());
  } catch {
    return NextResponse.json(unavailable);
  }
}

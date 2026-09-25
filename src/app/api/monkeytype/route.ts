import { unstable_cache } from "next/cache";
import { NextResponse } from "next/server";
import axios from "axios";
import type { MonkeytypeMetricBest, MonkeytypeSummary } from "@/types/monkeytype";

type MonkeytypePersonalBest = {
  wpm?: number;
};

type MonkeytypePersonalBestsResponse = {
  data?: Record<string, MonkeytypePersonalBest | MonkeytypePersonalBest[] | null>;
};

const unavailable: MonkeytypeSummary = {
  timeBest: null,
  wordBest: null,
};

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function getBestByMode(data: MonkeytypePersonalBestsResponse["data"]): MonkeytypeMetricBest | null {
  if (!data) {
    return null;
  }

  return Object.entries(data)
    .flatMap(([metricValue, records]) => {
      const metric = Number(metricValue);
      const candidates = Array.isArray(records) ? records : records ? [records] : [];
      return candidates.flatMap((candidate) =>
        Number.isFinite(metric) && isFiniteNumber(candidate.wpm)
          ? [{ metric, wpm: candidate.wpm }]
          : [],
      );
    })
    .sort((first, second) => second.wpm - first.wpm)[0] ?? null;
}

const getMonkeytypeSummary = unstable_cache(
  async (): Promise<MonkeytypeSummary> => {
    const apeKey = process.env.MONKEYTYPE_APE_KEY;

    if (!apeKey) {
      return unavailable;
    }

    const headers = {
      Authorization: `ApeKey ${apeKey}`,
    };

    const [timeBestsResult, wordBestsResult] = await Promise.allSettled([
      axios.get<MonkeytypePersonalBestsResponse>("https://api.monkeytype.com/users/personalBests", {
        headers,
        params: { mode: "time" },
      }),
      axios.get<MonkeytypePersonalBestsResponse>("https://api.monkeytype.com/users/personalBests", {
        headers,
        params: { mode: "words" },
      }),
    ]);

    if (timeBestsResult.status === "rejected" && wordBestsResult.status === "rejected") {
      throw new Error("Monkeytype API requests failed");
    }

    return {
      timeBest:
        timeBestsResult.status === "fulfilled" ? getBestByMode(timeBestsResult.value.data.data) : null,
      wordBest:
        wordBestsResult.status === "fulfilled" ? getBestByMode(wordBestsResult.value.data.data) : null,
    };
  },
  ["monkeytype-summary"],
  { revalidate: 3600 },
);

export async function GET() {
  try {
    return NextResponse.json(await getMonkeytypeSummary());
  } catch {
    return NextResponse.json(unavailable);
  }
}

'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

export function useWidgetData<T>(url: string) {
  const [result, setResult] = useState<{ url: string | null; data: T | null }>({ url: null, data: null });

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get<T>(url, { signal: controller.signal })
      .then(({ data }) => {
        if (!controller.signal.aborted) setResult({ url, data });
      })
      .catch(() => {
        if (!controller.signal.aborted) setResult({ url, data: null });
      });

    return () => controller.abort();
  }, [url]);

  const isLoading = result.url !== url;
  return { data: isLoading ? null : result.data, isLoading };
}

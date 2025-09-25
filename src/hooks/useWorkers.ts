"use client";
import { useEffect, useState } from "react";
import type { WorkerType } from "@/types/workers";

type UseWorkersResult = {
  data: WorkerType[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

let workersCache: WorkerType[] | null = null;

export function useWorkers(): UseWorkersResult {
  const [data, setData] = useState<WorkerType[] | null>(workersCache);
  const [loading, setLoading] = useState(!workersCache);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkers = async () => {
    setLoading(true);
    setError(null);
    try {
      if (workersCache) {
        setData(workersCache);
        setLoading(false);
        return;
      }
      const res = await fetch("/api/workers");
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const json = await res.json();
      if (!json?.success) throw new Error(json?.error || "Unknown error");
      workersCache = json.data;
      setData(workersCache);
    } catch (err: any) {
      console.error("useWorkers fetch error", err);
      setError(err?.message || "Failed to fetch workers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  const refetch = async () => {
    workersCache = null;
    await fetchWorkers();
  };

  return { data, loading, error, refetch };
}

"use client";

import { useState, useEffect } from "react";
import { analyticsAPI } from "@/lib/api";
import type { AnalyticsData } from "@/types";

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await analyticsAPI.get();
      if (res.success) {
        setAnalytics(res.data as AnalyticsData);
      } else {
        setError(res.error || "Failed to load analytics");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return { analytics, loading, error, refetch: fetchAnalytics };
}

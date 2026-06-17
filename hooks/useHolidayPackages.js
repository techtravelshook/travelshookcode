import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export function useHolidayPackages(filters) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading]   = useState(!!filters);
  const [mounted, setMounted]   = useState(false);
  const [error, setError]       = useState(null);

  // Normalise: accept plain string ("LUXURY") or an object config
  const normalisedFilters =
    typeof filters === "string" ? { type: filters } : filters ?? {};

  // Build a stable cache key for useEffect tracking
  const filterKey = JSON.stringify(normalisedFilters);

  const fetchHolidayPackages = useCallback(
    async (signal) => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        Object.entries(normalisedFilters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            params.append(key, value);
          }
        });

        // Target your new isolated Holiday API endpoint
        const res = await axios.get(
          `/api/holidays?${params.toString()}`,
          { signal }
        );

        // Fallback checks to support different backend structure responses
        const dataPayload = res.data?.data || res.data || [];
        setPackages(dataPayload);
      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error("Error fetching holiday packages:", err);
        setError(
          err.response?.data?.message || err.message || "Error occurred loading holidays"
        );
      } finally {
        if (!signal.aborted) {
          setLoading(false);
          setMounted(true);
        }
      }
    },
    [filterKey]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchHolidayPackages(controller.signal);
    return () => controller.abort();
  }, [fetchHolidayPackages]);

  const refetch = useCallback(() => {
    const controller = new AbortController();
    fetchHolidayPackages(controller.signal);
  }, [fetchHolidayPackages]);

  return { packages, loading, mounted, error, refetch };
}

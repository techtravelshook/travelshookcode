import { useState, useEffect, useCallback } from "react";
import axios from "axios";


export function usePackages(filters) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading]   = useState(!!filters);
  const [mounted, setMounted]   = useState(false);
  const [error, setError]       = useState(null);

  // Normalise: accept plain string ("MONTHLY") or an object
  const normalisedFilters =
    typeof filters === "string" ? { type: filters } : filters ?? {};

  // Build a stable cache key so useEffect only re-runs when filters really change
  const filterKey = JSON.stringify(normalisedFilters);

  const fetchPackages = useCallback(
    async (signal) => {
      const hasFilters = Object.keys(normalisedFilters).length > 0;
      if (!hasFilters) {
        setMounted(true);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        Object.entries(normalisedFilters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            params.append(key, value);
          }
        });

       const res = await axios.get(
  `/api/packages?${params.toString()}`,
  { signal }
);
        setPackages(res.data.data || []);
      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error("Error fetching packages:", err);
        setError(
          err.response?.data?.message || err.message || "Error occurred"
        );
      } finally {
        if (!signal.aborted) {
          setLoading(false);
          setMounted(true);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filterKey] // re-run only when the serialised filters change
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchPackages(controller.signal);
    return () => controller.abort();
  }, [fetchPackages]);
  const refetch = useCallback(() => {
    const controller = new AbortController();
    fetchPackages(controller.signal);
  }, [fetchPackages]);

  return { packages, loading, mounted, error, refetch };
}
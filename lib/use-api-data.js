"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { apiFetch } from "@/lib/api";

/**
 * useApiData — fetch one authenticated API path and keep its state.
 *
 * Returns { data, error, isLoading, reload }. The request starts on mount and
 * `reload()` runs it again (e.g. after a mutation). Results that arrive after
 * unmount — or after a newer request has started — are ignored. Failures are
 * surfaced through `error`, never swallowed.
 */
export function useApiData(path) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const mountedRef = useRef(true);
  const requestRef = useRef(0);

  const load = useCallback(async () => {
    const requestId = requestRef.current + 1;
    requestRef.current = requestId;
    setIsLoading(true);
    setError(null);

    try {
      const json = await apiFetch(path);
      if (!mountedRef.current || requestId !== requestRef.current) return;
      setData(json);
    } catch (err) {
      if (!mountedRef.current || requestId !== requestRef.current) return;
      setError(err);
    } finally {
      if (mountedRef.current && requestId === requestRef.current) {
        setIsLoading(false);
      }
    }
  }, [path]);

  useEffect(() => {
    mountedRef.current = true;
    let cancelled = false;

    // Kick off on a microtask: the hook's loading/error updates then happen
    // outside the effect body instead of causing a cascading render.
    Promise.resolve().then(() => {
      if (!cancelled) load();
    });

    return () => {
      cancelled = true;
      mountedRef.current = false;
    };
  }, [load]);

  return { data, error, isLoading, reload: load };
}

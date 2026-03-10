import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

const CLIENT_PATHNAME_EVENT = "novaleap:pathnamechange";

let isHistoryPatched = false;

function notifyClientPathnameChange() {
  window.dispatchEvent(new Event(CLIENT_PATHNAME_EVENT));
}

function ensureClientHistoryPatch() {
  if (typeof window === "undefined" || isHistoryPatched) {
    return;
  }

  isHistoryPatched = true;

  const originalPushState = window.history.pushState;
  const originalReplaceState = window.history.replaceState;

  window.history.pushState = function pushState(...args) {
    const result = originalPushState.apply(this, args);
    notifyClientPathnameChange();
    return result;
  };

  window.history.replaceState = function replaceState(...args) {
    const result = originalReplaceState.apply(this, args);
    notifyClientPathnameChange();
    return result;
  };
}

function subscribeToClientPathname(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  ensureClientHistoryPatch();

  window.addEventListener(CLIENT_PATHNAME_EVENT, onStoreChange);
  window.addEventListener("popstate", onStoreChange);

  return () => {
    window.removeEventListener(CLIENT_PATHNAME_EVENT, onStoreChange);
    window.removeEventListener("popstate", onStoreChange);
  };
}

function getClientPathnameSnapshot() {
  if (typeof window === "undefined") {
    return "";
  }

  return window.location.pathname;
}

/**
 * Custom Hook: useClientPathname
 *
 * Reads the current pathname from the browser without relying on App Router context.
 * Useful for client components mounted at the root where `usePathname()` can be unstable in dev.
 *
 * @example
 * const pathname = useClientPathname();
 */
export function useClientPathname() {
  return useSyncExternalStore(
    subscribeToClientPathname,
    getClientPathnameSnapshot,
    () => ""
  );
}

/**
 * Custom Hook: useAsync
 * 
 * Manages async operations with loading, error, and data states.
 * Perfect for API calls and data fetching.
 * 
 * @example
 * const { data, loading, error } = useAsync(() => fetch('/api/services'), []);
 */
export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate = true
) {
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">(
    "idle"
  );
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    setStatus("pending");
    setData(null);
    setError(null);
    try {
      const response = await asyncFunction();
      setData(response);
      setStatus("success");
      return response;
    } catch (e) {
      const err = e instanceof Error ? e : new Error(String(e));
      setError(err);
      setStatus("error");
      throw err;
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, data, error };
}

/**
 * Custom Hook: useFetch
 * 
 * Simplified hook for fetching data from API endpoints.
 * 
 * @example
 * const { data, isLoading } = useFetch<Service[]>('/api/services');
 */
export function useFetch<T>(url: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = (await response.json()) as T;
        setData(json);
      } catch (e) {
        setError(e instanceof Error ? e : new Error(String(e)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, isLoading, error };
}

/**
 * Custom Hook: useLocalStorage
 * 
 * Persists state to localStorage with type safety.
 * 
 * @example
 * const [theme, setTheme] = useLocalStorage('theme', 'light');
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === "undefined") {
        return initialValue;
      }
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch {
      console.error(`Failed to store ${key} to localStorage`);
    }
  };

  return [storedValue, setValue] as const;
}

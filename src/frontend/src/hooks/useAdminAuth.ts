import type { AdminSession } from "@/types";
import { useCallback, useEffect, useState } from "react";

const SESSION_KEY = "jodex_admin_session";

export function useAdminAuth() {
  const [session, setSession] = useState<AdminSession>(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as AdminSession;
        return parsed;
      }
    } catch {
      // ignore
    }
    return { token: "", isAuthenticated: false };
  });

  useEffect(() => {
    if (session.isAuthenticated) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }, [session]);

  const login = useCallback((username: string, password: string): boolean => {
    if (username === "diwakar3223og@gmail.com" && password === "20052005") {
      const token = `admin_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      setSession({ token, isAuthenticated: true });
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setSession({ token: "", isAuthenticated: false });
  }, []);

  return { session, login, logout };
}

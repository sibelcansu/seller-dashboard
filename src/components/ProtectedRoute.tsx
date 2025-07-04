//rafce
import type { Session } from "@supabase/supabase-js";
import type React from "react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { supabase } from "../lib/supabaseClient";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // usss
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // uffs
  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => setSession(data.session))
      .then(() => setLoading(false));
  }, []);
  if (loading) return <h1>Yükleniyor...</h1>;

  if (!session) {
    return <Navigate to={"/"} replace />;
  }

  return children;
};

export default ProtectedRoute;
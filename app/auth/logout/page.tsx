"use client";

import React, { useEffect } from "react";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

function LogoutPage() {
  const router = useRouter();

  const logout = async (): Promise<void> => {
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signOut();
  };

  useEffect(() => {
    logout();
  }, []);

  return (
    <div className="container p-6 mx-auto mt-10 w-80 border shadow-lg">
      <h2 className="text-xl my-2">Olet kirjautunut ulos.</h2>

      <button onClick={() => router.push("/auth/login")}>Ok</button>
    </div>
  );
}

export default LogoutPage;

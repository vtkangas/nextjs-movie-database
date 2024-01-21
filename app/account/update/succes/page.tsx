"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

function UpdatePasswordSuccesPage() {
  const router = useRouter();

  const logout = async (): Promise<void> => {
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signOut();
  };

  useEffect(() => {
    logout();
  }, []);

  return (
    <div className="container mx-auto p-6 mt-10 w-80 border shadow-lg">
      <h2 className="text-xl my-2">Salasanan vaihto onnistui!</h2>

      <button onClick={() => router.push("/auth/login")}>Ok</button>
    </div>
  );
}

export default UpdatePasswordSuccesPage;

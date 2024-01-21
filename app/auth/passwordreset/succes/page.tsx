"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function ResetPasswordSuccesPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto p-6 mt-10 w-80 border shadow-lg">
      <h2 className="text-xl my-2">
        Vahvistuslinkki on lähetetty sähköpostiisi!
      </h2>

      <p>Etkö ole vieläkään saanut vahvistuslinkkiä?</p>
      <Link
        className="font-main inline-block p-2 mr-4"
        href={"/auth/passwordreset"}
      >
        Yritä uudelleen
      </Link>
    </div>
  );
}

export default ResetPasswordSuccesPage;

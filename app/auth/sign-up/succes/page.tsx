"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function SignUpSuccesPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto p-6 mt-10 w-80 border shadow-lg">
      <h2 className="text-xl my-2">
        Vahvistuslinkki on lähetetty sähköpostiisi!
      </h2>

      <Link className="font-main inline-block p-2 mr-4" href={"/auth/login"}>
        Ok
      </Link>
    </div>
  );
}

export default SignUpSuccesPage;

"use client";

import Image from "next/image";
import logo from "@/public/images/xamkflixLogoRed.png";
import { useRef, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

function ResetPasswordPage(): React.ReactElement {
  const formRef: React.MutableRefObject<any> = useRef<HTMLFormElement>();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string>("");

  const sendEmail = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    const supabase = createClientComponentClient();

    const email: string = formRef.current.email.value;
    console.log(email);
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/account/update`,
    });

    if (!error) {
      router.push("/auth/passwordreset/succes");
    } else {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="container mx-auto mt-10 w-80 border shadow-lg">
      <form className="p-6 space-y-2" ref={formRef} autoComplete="off">
        <div className="grid p-4 mb-6 w-full place-items-center">
          <Image
            src={logo}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            alt="xamkflix_logo"
            priority
          />
        </div>
        <h2 className="text-xl my-2">Uusi salasana</h2>
        <p>
          Anna sähköpostiosoitteesi. Saat sähköpostiisi vahvistuslinkin, jolla
          voit vaihtaa salasanasi.
        </p>
        <input
          type="text"
          name="email"
          placeholder="Sähköposti"
          className="input input-bordered w-full rounded-none"
          autoComplete="new-password"
        />

        <button
          onClick={sendEmail}
          className="btn w-full border-none bg-teal-400 text-white p-2 rounded block text-center"
        >
          Lähetä
        </button>

        {Boolean(errorMsg) ? (
          <div className="alert alert-error rounded-md text-sm">{errorMsg}</div>
        ) : null}
      </form>
      <Link className="font-main inline-block p-2 mr-4" href={"/"}>
        Peruuta
      </Link>
    </div>
  );
}

export default ResetPasswordPage;

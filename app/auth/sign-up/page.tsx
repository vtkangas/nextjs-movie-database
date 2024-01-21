"use client";

import Image from "next/image";
import logo from "@/public/images/xamkflixLogoRed.png";
import { useRef, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

function SignUpPage(): React.ReactElement {
  const formRef: React.MutableRefObject<any> = useRef<HTMLFormElement>();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string>("");

  const signUp = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (
      formRef.current.password.value !== formRef.current.confirmPassword.value
    ) {
      setErrorMsg("Salasanat eivät täsmää");
      return;
    }

    const supabase = createClientComponentClient();

    const { data, error } = await supabase.auth.signUp({
      email: formRef.current.username.value,
      password: formRef.current.password.value,
    });

    if (!error) {
      router.push("/auth/sign-up/succes");
    } else {
      setErrorMsg("Jotain meni pieleen.:/");
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

        <input
          type="text"
          name="username"
          placeholder="Käyttäjätunnus"
          className="input input-bordered w-full rounded-none"
          autoComplete="new-password"
        />

        <input
          type="password"
          name="password"
          placeholder="Salasana"
          className="input input-bordered w-full rounded-none"
          autoComplete="new-password"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="vahvista salasana"
          className="input input-bordered w-full rounded-none"
          autoComplete="new-password"
        />

        <button
          onClick={signUp}
          className="btn w-full border-none bg-teal-400 text-white p-2 rounded block text-center"
        >
          Rekisteröidy
        </button>

        {Boolean(errorMsg) ? (
          <div className="alert alert-error rounded-md text-sm">{errorMsg}</div>
        ) : null}
      </form>
      <Link className="font-main inline-block p-2 mr-4" href={"/login"}>
        Palaa takaisin
      </Link>
    </div>
  );
}

export default SignUpPage;

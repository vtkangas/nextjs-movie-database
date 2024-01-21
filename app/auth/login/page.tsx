"use client";

import Image from "next/image";
import logo from "@/public/images/xamkflixLogoRed.png";
import { useEffect, useRef, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

function LoginPage(): React.ReactElement {
  const formRef: React.MutableRefObject<any> = useRef<HTMLFormElement>();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string>("");

  //redirects to homepage if user session is active

  const checkForActiveSession = async () => {
    const supabase = createClientComponentClient();

    const { data } = await supabase.auth.getSession();

    if (data.session) {
      router.push("/");
    }
  };

  useEffect(() => {
    checkForActiveSession();
  }),
    [];

  const login = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    const supabase = createClientComponentClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formRef.current.username.value,
      password: formRef.current.password.value,
    });

    if (!error) {
      router.push("/");
    } else {
      setErrorMsg("Käyttäjätunnus tai salasana on virheellinen.");
    }
  };

  return (
    <div className="container mx-auto mt-10 w-80 border shadow-lg">
      <form className="p-6 space-y-2" ref={formRef}>
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
        />

        <input
          type="password"
          name="password"
          placeholder="Salasana"
          className="input input-bordered w-full rounded-none"
        />

        <button
          onClick={login}
          className="btn w-full border-none bg-teal-400 text-white p-2 rounded block text-center"
        >
          Kirjaudu sisään
        </button>

        {Boolean(errorMsg) ? (
          <div className="alert alert-error rounded-md text-sm">{errorMsg}</div>
        ) : null}
      </form>
      <Link
        className="font-main inline-block p-2 mr-4"
        href={"/auth/passwordreset"}
      >
        Unohtuiko salasana?
      </Link>
      <Link className="font-main inline-block p-2 mr-4" href={"/auth/sign-up"}>
        Rekisteröidy
      </Link>
    </div>
  );
}

export default LoginPage;

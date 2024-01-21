"use client";

import Image from "next/image";
import logo from "@/public/images/xamkflixLogoRed.png";
import { useRef, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

function UpdatePage(): React.ReactElement {
  const formRef: React.MutableRefObject<any> = useRef<HTMLFormElement>();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string>("");

  const update = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (
      formRef.current.newPassword.value !==
      formRef.current.confirmPassword.value
    ) {
      setErrorMsg("Salasanat eivät täsmää");
      return;
    }

    const supabase = createClientComponentClient();

    const { data, error } = await supabase.auth.updateUser({
      password: formRef.current.newPassword.value,
    });

    if (!error) {
      router.push("/account/update/succes");
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

        <input
          type="password"
          name="newPassword"
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
          onClick={update}
          className="btn w-full border-none bg-teal-400 text-white p-2 rounded block text-center"
        >
          Vaihda salasana
        </button>

        {Boolean(errorMsg) ? (
          <div className="alert alert-error rounded-md text-sm">{errorMsg}</div>
        ) : null}
      </form>
    </div>
  );
}

export default UpdatePage;

"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Button from "../components/button";

export default function Header() {
  const { data: session, status } = useSession();

  return (

    <header className="bg-white flex items-center justify-between px-8 py-4 shadow w-full sticky top-0 h-[10vh] z-10">
      <div className="flex items-center space-x-2 bg-[url('/image/logo.png')] h-15 w-15 border-2 border-[#EA2849] rounded-md bg-cover bg-center"></div>


      <nav className="space-x-4">
        <Button link="/">Home</Button>

        {status === "loading" ? null : session ? (
          <>

            <Button link="/dashboard">Dashboard</Button>
            <span onClick={() => signOut({ callbackUrl: "/" })}>
              <Button link="/">Logout</Button>
            </span>

          </>
        ) : (
          <>
            <Button link="/auth/signup">SignUp</Button>
            <Button link="/auth/login">Login</Button>
          </>
        )}
      </nav>
    </header>
  );
}

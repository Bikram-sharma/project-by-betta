"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="bg-blue-900 flex items-center justify-between px-8 py-4 shadow w-full sticky top-0 h-[10vh] z-10">
      <div className="flex items-center space-x-2 bg-[url('/image/logo.png')] h-20 w-20 rounded-md bg-cover bg-center"></div>

      <nav className="space-x-4">
        <Link href="/">
          <button className="bg-white text-black rounded-md h-10 w-20 hover:bg-gray-300 cursor-pointer transition">
            Home
          </button>
        </Link>

        {status === "loading" ? null : session ? (
          <>
            <Link href="/dashboard">
              <button className="bg-white text-black rounded-md h-10 w-24 hover:bg-gray-300 cursor-pointer transition">
                Dashboard
              </button>
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-white text-black rounded-md h-10 w-20 hover:bg-gray-300 cursor-pointer transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/signup">
              <button className="bg-white text-black rounded-md h-10 w-20 hover:bg-gray-300 cursor-pointer transition">
                SignUp
              </button>
            </Link>
            <Link href="/auth/login">
              <button className="bg-white text-black rounded-md h-10 w-20 hover:bg-gray-300 cursor-pointer transition">
                Login
              </button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

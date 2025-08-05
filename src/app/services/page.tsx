"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Card from "@/app/components/card";
import { redirect } from "next/navigation";

export default function Deskboard() {
  const { data: session, status } = useSession();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/auth/login");
    }
  }, [status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  return (
    <main>
      <div className="h-25 w-full">
        <div>
          <h1 className="text-3xl text-black">Name</h1>
        </div>
        <div className="flex items-center justify-center gap-2 mt-2 p-2">
          <input
            type="text"
            placeholder="Type to search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-50 py-2 text-black border rounded-lg focus:outline-none focus:border-blue-100 hover:bg-blue-500"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-500 transition duration-200"
          >
            Search
          </button>
        </div>
      </div>

      {/* image and Name */}
      <div className="flex gap-30">
        <div className="flex flex-col rounded-md justify-start items-start h-full w-[200px] bg-[#1373E6] mt-4 p-5 gap-15 text-black">
          <h2 className=" text-white text-4xl font-bold">Service Panel</h2>
          <nav className="text-white text-2xl flex flex-col gap-10 w-full ">
            <a href="/messages" className="hover:underline">
              💬 Messages / Chat
            </a>
            <a href="/support" className="hover:underline">
              ❓ Help and Support
            </a>
            <a href="/reviews" className="hover:underline">
              ⭐ Customer Reviews
            </a>
            <a href="/notifications" className="hover:underline">
              🔔 Notifications
            </a>
            <a href="/profile" className="hover:underline">
              👤 Profile
            </a>
            <a href="/security" className="hover:underline">
              🔒 Privacy & Security
            </a>
            <a href="/settings" className="hover:underline">
              ⚙️ Settings
            </a>
            <a href="/analytics" className="hover:underline">
              📊 Analytics / Reports
            </a>
          </nav>

          <button
            className=" flex items-center gap-2 text-black hover:text-red-600 mt-auto"
            onClick={() => signOut()}
          >
            🚪 Logout
          </button>
        </div>

        <div className="flex justify-end">
          <section className="grid grid-cols-5 pd-2 gap-4 mt-2 p-5">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </section>
        </div>
      </div>
    </main>
  );
}

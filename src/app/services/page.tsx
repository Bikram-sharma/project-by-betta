"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Card from "@/app/components/card";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/auth/login");
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  return (

    <main className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container text-black bg-white mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Welcome, {session.user?.name || "User"}!</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-300 w-64"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex flex-col md:flex-row gap-6 p-4">
        <div className="bg-blue-600 rounded-lg shadow-md w-full md:w-64 p-4 flex-shrink-0">
          <h2 className="text-white text-2xl font-bold mb-6 pb-2 border-b border-blue-400">Service Panel</h2>
          
          <nav className="space-y-4">
            {[
              { icon: "💬", label: "Messages / Chat", href: "/messages" },
              { icon: "❓", label: "Help and Support", href: "/support" },
              { icon: "⭐", label: "Customer Reviews", href: "/reviews" },
              { icon: "🔔", label: "Notifications", href: "/notifications" },
              { icon: "👤", label: "Profile", href: "/profile" },
              { icon: "🔒", label: "Privacy & Security", href: "/security" },
              { icon: "⚙️", label: "Settings", href: "/settings" },
              { icon: "📊", label: "Analytics / Reports", href: "/analytics" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center space-x-3 text-white hover:bg-blue-500 px-3 py-2 rounded-md transition-colors duration-200"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-lg">{item.label}</span>
              </a>
            ))}

          </nav>

          <button
            onClick={() => signOut()}
            className="mt-8 w-full flex items-center justify-center space-x-2 bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-md font-medium transition-colors duration-200"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 10 }).map((_, index) => (
              <Card key={index} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
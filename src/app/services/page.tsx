"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Card from "@/app/components/card";
import { redirect } from "next/navigation";

export default function ServicesPage() {
  type ServiceProvider = {
    name: string;
    skill: string;
    experience: string;
    location: string;
    rate: string;
  };

  const { data: session, status } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [cardData, setCardData] = useState<ServiceProvider[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/auth/login");
    }
  }, [status]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stored = sessionStorage.getItem("serviceData");
        const filters = stored ? JSON.parse(stored) : null;

        const res = await fetch("http://localhost:3000/api/service-providers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filters),
        });

        if (!res.ok) throw new Error("Failed to fetch service providers");

        const data = await res.json();
        setCardData(data);
      } catch (error) {
        console.error("Error fetching service providers:", error);
      }
    };

    fetchData();
  }, []);

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return null;

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
    // Optional: implement filter here
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container text-black bg-white mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Welcome, {session.user?.name || "User"}!
          </h1>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar + Cards */}
      <div className="flex gap-30">
        {/* Sidebar */}
        <div className="flex flex-col rounded-md justify-start items-start h-full w-[200px] bg-[#1373E6] mt-4 p-5 gap-15 text-black">
          <h2 className="text-white text-4xl font-bold">Service Panel</h2>
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
            onClick={() => signOut()}
            className="mt-8 w-full flex items-center justify-center space-x-2 bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-md font-medium transition-colors duration-200"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>

        {/* Card Grid */}
        <div className="flex justify-end">
          <section className="grid grid-cols-5 pd-2 gap-4 mt-2 p-5">
            {cardData.length > 0 ? (
              cardData.map((item, index) => (
                <Card
                  key={index}
                  name={item.name}
                  skill={item.skill}
                  experience={item.experience}
                  location={item.location}
                  rate={item.rate}
                />
              ))
            ) : (
              <p className="text-black">No service providers found.</p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ServiceProviderDashboard() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    hours: "",
  });

  const services = [
    "Plumbing",
    "Electrical",
    "Cleaning",
    "Gardening",
    "AC Repair",
  ];

  useEffect(() => {
    if (session?.user) {
      // Sample: Populate user data from session
      setUser({
        name: session.user.name || "",
        email: session.user.email || "",
        phone: "123-456-7890",
        location: "Your City, Country",
        hours: "9 AM - 5 PM",
      });
    }
  }, [session]);

  if (status === "loading") return <div className="p-4">Loading...</div>;

  if (status === "unauthenticated") {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 container mx-auto py-8 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <section className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-1 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Name
                  </label>
                  <p className="text-lg font-semibold">{user.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Email
                  </label>
                  <p className="text-lg font-semibold">{user.email}</p>
                </div>
              </div>

              {/* Social Media and Register Button */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-black mb-3">
                  Social Media Links
                </h2>
                <div className="flex space-x-4">
                  {/* Add your SVG icons here */}
                </div>
              </div>

              <Link
                href="/registration"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-center block"
              >
                Register as Service Provider
              </Link>
            </section>

            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-black mb-6">
                Services We Provide
              </h2>
              <div className="grid grid-cols-1 gap-4 mb-6">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                  >
                    <h3 className="font-medium text-lg text-black">
                      {service}
                    </h3>
                    <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
                      Learn more →
                    </button>
                  </div>
                ))}
              </div>
              <Link href={"/services"}>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
                  Book Service
                </button>
              </Link>
            </section>
          </div>

          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-black mb-6">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Phone number
                </label>
                <p className="text-lg font-semibold">{user.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Email address
                </label>
                <p className="text-lg font-semibold">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Physical Location
                </label>
                <p className="text-lg font-semibold">{user.location}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Business hours
                </label>
                <p className="text-lg font-semibold">{user.hours}</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

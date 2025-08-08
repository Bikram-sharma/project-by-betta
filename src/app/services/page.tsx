"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Card from "@/app/components/card";
import { redirect } from "next/navigation";

export default function ServicesPage() {
  type ServiceProvider = {
    full_name: string;
    skill: string;
    experience: string;
    location: string;
    rate: string;
  };

  const { data: session, status } = useSession();
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

        const { categories, location } = stored ? JSON.parse(stored) : null;

        if (categories && location) {
          const res = await fetch(
            `http://localhost:3000/api/service-providers?categories=${encodeURIComponent(
              categories
            )}&location=${encodeURIComponent(location)}`,
            {
              method: "GET",
              cache: "no-store",
            }
          );
          if (!res.ok) throw new Error("Failed to fetch service providers");

          const data = await res.json();

          setCardData(data);
        }
      } catch (error) {
        console.error("Error fetching service providers:", error);
      }
    };

    fetchData();
  }, []);

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return null;

  return (
    <main className="min-h-screen bg-white p-5">
      <div className="h-24 w-[90vw] mx-auto bg-white shadow-md rounded-full flex items-center justify-center px-6 text-lg md:text-xl text-gray-800">
        <p className="text-center">
          Explore the available service providers below. Click the
          <span className="text-[#EA2849] font-semibold">"Book"</span> button on
          your preferred card to confirm your booking.
        </p>
      </div>

      <section className="grid grid-cols-5 pd-2 gap-4 mt-2 p-5">
        {cardData.length > 0 ? (
          cardData.map((item, index) => (
            <Card
              key={index}
              name={item.full_name}
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
    </main>
  );
}

"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function ServiceProviderDashboard() {
  const router = useRouter();
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

  const bookingHandler = () => {
    Swal.fire({
      title: "Provide Service Details",
      html: `
    <label for="service">Service</label>
    <select id="service" class="swal2-input">
      <option value="" disabled selected>Select a service</option>
      <option value="Plumbing">Plumbing</option>
      <option value="Electrician">Electrician</option>
      <option value="Cleaning">Cleaning</option>
      <option value="Painting">Painting</option>
    </select>

    <input type="text" id="location" class="swal2-input" placeholder="Enter location">
    <input type="text" id="contact" class="swal2-input" placeholder="Contact No.">
  `,
      cancelButtonText: "Cancel",
      showCancelButton: true,
      confirmButtonText: "Submit",
      focusConfirm: false,

      preConfirm: () => {
        const service = (
          document.getElementById("service") as HTMLSelectElement
        )?.value;
        const location = (
          document.getElementById("location") as HTMLInputElement
        )?.value;
        const contact = (document.getElementById("contact") as HTMLInputElement)
          ?.value;

        if (!service || !location || !contact) {
          Swal.showValidationMessage("Please fill in all fields");
          return false;
        }

        return { service, location, contact };
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        sessionStorage.setItem("serviceData", JSON.stringify(result.value));

        router.push("/services");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Service Provider Dashboard</h1>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-600 rounded-lg shadow-md p-6 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h2>
          <p className="opacity-90">Manage your services and profile information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white">Your Profile</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Name</label>
                    <p className="mt-1 text-lg font-semibold text-gray-900">{user.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Email</label>
                    <p className="mt-1 text-lg font-semibold text-gray-900">{user.email}</p>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href="/registration"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out flex items-center justify-center"
                  >
                    <span>Register as Service Provider</span>
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>


              <button
                onClick={bookingHandler}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
              >
                Book Service
              </button>
            </section>
          </div>


          <section className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white">Your Services</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {services.map((service, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-150 ease-in-out"
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium text-lg text-gray-900">{service}</h3>
                          <button className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
                            Learn more
                            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/services">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out flex items-center justify-center">
                    <span>Book Service</span>
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </div>

        <section className="mt-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white">Contact Information</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-500">Phone number</label>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{user.phone}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-500">Email address</label>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{user.email}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-500">Physical Location</label>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{user.location}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-500">Business hours</label>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{user.hours}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
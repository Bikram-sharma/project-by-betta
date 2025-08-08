"use client";
import "@/app/globals.css";
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

  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [serviceCategories, setServiceCategories] = useState<
    { id: number; name: string }[]
  >([]);

  const services = [
    {
      name: "Home Services",
      subServices: [
        "Solar panel installation",
        "Electrical repairs & wiring",
        "Plumbing & leak fixes",
        "Painting, tiling, and basic renovations",
        "Furniture assembly & handyman work",
      ],
    },
    {
      name: "Tech & IT Support",
      subServices: [
        "Website and app development",
        "Computer & laptop repair",
        "Network setup & troubleshooting",
        "Cloud storage & data migration",
        "IT training & tech consultation",
      ],
    },
    {
      name: "Creative & Design",
      subServices: [
        "Logo & branding design",
        "Graphic design (posters, flyers, banners)",
        "UI/UX and web design",
        "Video editing & production",
        "Illustration (books, education, promo)",
      ],
    },
    {
      name: "Cleaning & Maintenance",
      subServices: [
        "House cleaning (regular/deep)",
        "Office and commercial cleaning",
        "Appliance servicing",
        "Pest control services",
      ],
    },
    {
      name: "Tutoring & Education",
      subServices: [
        "School subject tutoring",
        "Language lessons",
        "Computer skills & digital literacy",
        "Exam prep (BCSE, Class XII, etc.)",
      ],
    },
    {
      name: "Skilled Labor & Others",
      subServices: [
        "Masonry & carpentry",
        "Welding & fabrication",
        "Event setup (sound, lighting, decor)",
        "Delivery and courier support",
      ],
    },
  ];

  useEffect(() => {}, []);

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
    const getCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/service-categories"
        );
        if (!response.ok) throw new Error("Failed to fetch categories");

        const data = await response.json();
        setServiceCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    getCategories();
  }, [session]);

  if (status === "loading") return <div className="p-4">Loading...</div>;
  if (status === "unauthenticated") redirect("/auth/login");

  const toggleService = (serviceName: string) => {
    if (expandedService === serviceName) {
      setExpandedService(null);
    } else {
      setExpandedService(serviceName);
    }
  };

  const bookingHandler = () => {
  Swal.fire({
    title: "Provide Service Details",
    html: `
      <label for="categories" class="block text-left mb-1 font-semibold text-sm text-gray-700">Service</label>
      <select id="categories" class="w-full mb-3 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none">
        <option value="" disabled selected>Select a Service Category</option>
        ${serviceCategories.map(category => 
          `<option value="${category.name}">${category.name}</option>`
        ).join('')}
      </select>

      <label for="location" class="block text-left mb-1 font-semibold text-sm text-gray-700">Location</label>
      <input type="text" id="location" placeholder="Enter location" class="w-full mb-3 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />

      <label for="contact" class="block text-left mb-1 font-semibold text-sm text-gray-700">Contact No.</label>
      <input type="text" id="contact" placeholder="Contact No." class="w-full mb-3 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />
    `,
    cancelButtonText: "Cancel",
    showCancelButton: true,
    confirmButtonText: "Submit",
    confirmButtonColor: "#EA2849",
    focusConfirm: false,
    customClass: {
      confirmButton: "swal-confirm-btn",
      cancelButton: "swal-cancel-btn",
    },
    preConfirm: () => {
      const categories = (document.getElementById("categories") as HTMLSelectElement)
        ?.value;
      const location = (
        document.getElementById("location") as HTMLInputElement
      )?.value;
      const contact = (document.getElementById("contact") as HTMLInputElement)
        ?.value;

      if (!categories || !location || !contact) {
        Swal.showValidationMessage("Please fill in all fields");
        return false;
      }

      return { categories, location, contact };
    },
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      sessionStorage.setItem("serviceData", JSON.stringify(result.value));
      router.push("/services");
    }
  });
};

  return (
    <div className="min-h-screen">
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="border rounded-lg shadow-md p-6 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-2">
            Welcome back, {user.name}!
          </h2>
          <p className="opacity-90">
            Manage your services and profile information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-1">
            <div className=" bg-black/50 shadow-md border rounded-lg overflow-hidden h-109">
              <div className=" rounded-t-lg px-6 border-b py-4 overflow-hidden">
                <h2 className="text-xl font-bold text-center">Your Profile</h2>
              </div>
              <div className="p-6 space-y-4 h-100">
                <div>
                  <label className="block text-sm font-medium">Name</label>
                  <p className="mt-1 text-lg font-semibold">{user.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <p className="mt-1 text-lg font-semibold">{user.email}</p>
                </div>

                <div className="mt-20">
                  <Link
                    href="/registration"
                    className="w-full h-10 rounded-full border text-[#EA2849] border-[#EA2849]  hover:bg-[#EA2849] hover:text-white font-medium py-2 px-4  transition duration-150 ease-in-out flex items-center justify-center "
                  >
                    <span>Register as Service Provider</span>
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>

                <button
                  onClick={bookingHandler}
                  className="w-full border border-[#EA2849] hover:text-[#EA2849] bg-[#EA2849] h-10 hover:bg-transparent text-white rounded-full"
                >
                  Book Service
                </button>
              </div>
            </div>
          </section>

          <section className="lg:col-span-2">
            <div className="bg-black/50 border rounded-lg shadow-md overflow-hidden">
              <div className="border-b px-6 py-4">
                <h2 className="text-xl font-bold text-white">Your Services</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {serviceCategories.map((categories) => (
                    <div
                      key={categories.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-150 ease-in-out"
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <svg
                            className="h-6 w-6 text-[#EA2849]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium text-lg">
                            {categories.name}
                          </h3>
                          <button
                            onClick={() => toggleService(categories.name)}
                            className="mt-2 text-sm text-[#EA2849] font-medium flex items-center cursor-pointer"
                          >
                            {expandedService === categories.name
                              ? "Hide details"
                              : "Services"}
                            <svg
                              className={`ml-1 w-4 h-4 transition-transform ${
                                expandedService === categories.name
                                  ? "transform rotate-90"
                                  : ""
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </button>
                          {expandedService === categories.name && (
                            <ul className="mt-2 space-y-1 pl-2 text-sm">
                              {services
                                .find(
                                  (service) => service.name === categories.name
                                )
                                ?.subServices.map((subService, subIndex) => (
                                  <li
                                    key={subIndex}
                                    className="flex items-start"
                                  >
                                    <span className="h-1 w-1 mt-2 mr-2 rounded-full bg-gray-500"></span>
                                    <span>{subService}</span>
                                  </li>
                                ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

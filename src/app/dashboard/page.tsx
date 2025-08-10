"use client";
import "@/app/globals.css";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function ServiceProviderDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [user, setUser] = useState({
    id: "",
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
  const [edit, setEdit] = useState(false);

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

  useEffect(() => {
    if (session?.user) {
      setUser({
        id: String(session.user.id) || "",
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
        ${serviceCategories
          .map(
            (category) =>
              `<option value="${category.name}">${category.name}</option>`
          )
          .join("")}
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
        const categories = (
          document.getElementById("categories") as HTMLSelectElement
        )?.value;
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
  const updateProfile = async () => {
    try {
      const updates = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      const response = await fetch("http://localhost:3000/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error("Failed to update Profile!");
      const data = await response.json();
      Swal.fire({
        title: data.message,
        icon: response.ok ? "success" : "error",
        confirmButtonText: "Okay",
        confirmButtonColor: "#EA2849",
        customClass: {
          confirmButton: "swal-confirm-btn",
        },
      }).then((result) => {
        signOut({ callbackUrl: "/auth/login" });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAccount = async () => {
    const result = await Swal.fire({
      title: "This action cannot be undone. Delete account?",
      icon: "warning",
      confirmButtonText: "Confirm Delete",
      confirmButtonColor: "#EA2849",
      cancelButtonText: "Cancel",
      showCancelButton: true,
      customClass: {
        confirmButton: "swal-confirm-btn",
        cancelButton: "swal-cancel-btn",
      },
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/profile?id=${user.id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete account");
        }

        Swal.fire("Deleted!", "Your account has been deleted.", "success");
        signOut({ callbackUrl: "/" });
      } catch (error: any) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  const addCategory = async () => {
    const { value: categoryName } = await Swal.fire({
      title: "Enter the service category name",
      html: `<label for="category" class="block text-left mb-1 font-semibold text-sm text-gray-700">Category Name</label>
           <input type="text" id="category" placeholder="service category name" class="w-full mb-3 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />`,
      focusConfirm: false,
      confirmButtonText: "Submit",
      confirmButtonColor: "#EA2849",
      cancelButtonText: "Cancel",
      showCancelButton: true,
      preConfirm: () => {
        const input = (
          document.getElementById("category") as HTMLInputElement
        ).value.trim();
        if (!input) {
          Swal.showValidationMessage("Category name cannot be empty");
        }
        return input;
      },
      customClass: {
        confirmButton: "swal-confirm-btn",
        cancelButton: "swal-cancel-btn",
      },
    });

    if (categoryName) {
      try {
        const response = await fetch(
          "http://localhost:3000/api/service-categories",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: categoryName }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to add category");
        }

        Swal.fire({
          icon: "success",
          title: "Category added successfully!",
        });
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message || "Something went wrong!",
        });
      }
    }
  };

  const addServices = async (categoryId: number) => {
    const { value: serviceName } = await Swal.fire({
      title: "Add New Service",
      html: `
      <label for="service" class="block text-left mb-1 font-semibold text-sm text-gray-700">Service Name</label>
      <input type="text" id="service" placeholder="Service name" 
        class="w-full mb-3 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />
    `,
      focusConfirm: false,
      confirmButtonText: "Submit",
      confirmButtonColor: "#EA2849",
      cancelButtonText: "Cancel",
      showCancelButton: true,
      preConfirm: () => {
        const service = (
          document.getElementById("service") as HTMLInputElement
        ).value.trim();
        if (!service) {
          Swal.showValidationMessage("Service name cannot be empty");
          return false;
        }
        return service;
      },
      customClass: {
        confirmButton: "swal-confirm-btn",
        cancelButton: "swal-cancel-btn",
      },
    });

    if (serviceName) {
      try {
        const response = await fetch("http://localhost:3000/api/services", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: serviceName,
            categoryId,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to add service");
        }

        Swal.fire({
          icon: "success",
          title: "Service added successfully!",
        });
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message || "Something went wrong!",
        });
      }
    }
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
              <div className=" rounded-t-lg px-6 border-b py-4 overflow-hidden flex justify-between">
                <h2 className="text-xl font-bold text-center">Your Profile</h2>
                <div className="text-xl font-bold text-center flex space-x-4">
                  <span title="edit profile " onClick={() => setEdit(!edit)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                      className="w-6 h-6 inline-block fill-[#EA2849] cursor-pointer"
                    >
                      <path d="M505 122.9L517.1 135C526.5 144.4 526.5 159.6 517.1 168.9L488 198.1L441.9 152L471 122.9C480.4 113.5 495.6 113.5 504.9 122.9zM273.8 320.2L408 185.9L454.1 232L319.8 366.2C316.9 369.1 313.3 371.2 309.4 372.3L250.9 389L267.6 330.5C268.7 326.6 270.8 323 273.7 320.1zM437.1 89L239.8 286.2C231.1 294.9 224.8 305.6 221.5 317.3L192.9 417.3C190.5 425.7 192.8 434.7 199 440.9C205.2 447.1 214.2 449.4 222.6 447L322.6 418.4C334.4 415 345.1 408.7 353.7 400.1L551 202.9C579.1 174.8 579.1 129.2 551 101.1L538.9 89C510.8 60.9 465.2 60.9 437.1 89zM152 128C103.4 128 64 167.4 64 216L64 488C64 536.6 103.4 576 152 576L424 576C472.6 576 512 536.6 512 488L512 376C512 362.7 501.3 352 488 352C474.7 352 464 362.7 464 376L464 488C464 510.1 446.1 528 424 528L152 528C129.9 528 112 510.1 112 488L112 216C112 193.9 129.9 176 152 176L264 176C277.3 176 288 165.3 288 152C288 138.7 277.3 128 264 128L152 128z" />
                    </svg>
                  </span>
                  <span title="delete account" onClick={deleteAccount}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                      className="w-6 h-6 inline-block fill-[#EA2849] cursor-pointer"
                    >
                      <path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z" />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-4 h-100">
                <div>
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    className={`mt-1 text-lg font-semibold w-full h-8 px-2 ${
                      edit
                        ? "focus:outline-blue-500 focus:ring-2"
                        : "focus:outline-none focus:ring-0 pointer-events-none"
                    }`}
                    readOnly={!edit}
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    className={`mt-1 text-lg font-semibold w-full h-8 px-2 ${
                      edit
                        ? "focus:outline-blue-500 focus:ring-2"
                        : "focus:outline-none focus:ring-0 pointer-events-none"
                    }`}
                    readOnly={!edit}
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </div>
                {edit && (
                  <div className="flex justify-evenly">
                    <button
                      onClick={updateProfile}
                      className="bg-[#EA2849] h-10 w-30 border-2 border-[#EA2849] hover:bg-transparent hover:text-[#EA2849] cursor-pointer rounded-full"
                    >
                      update
                    </button>

                    <button
                      onClick={() => (
                        setUser({
                          ...user,
                          name: session?.user?.name as string,
                          email: session?.user?.email as string,
                        }),
                        setEdit(!edit)
                      )}
                      className=" h-10 w-30 border-2 border-[#EA2849] hover:bg-[#EA2849] hover:text-white text-[#EA2849] cursor-pointer rounded-full"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                <div className="mt-10">
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
                  className="w-full border border-[#EA2849] hover:text-[#EA2849] bg-[#EA2849] h-10 hover:bg-transparent text-white rounded-full cursor-pointer"
                >
                  Book Service
                </button>
              </div>
            </div>
          </section>

          <section className="lg:col-span-2">
            <div className="bg-black/50 border rounded-lg shadow-md overflow-hidden">
              <div className="border-b px-6 py-4 flex justify-between">
                <h2 className="text-xl font-bold text-white">
                  Services Available
                </h2>
                <h2 className="text-[#EA2849] cursor-pointer flex items-center space-x-2">
                  <span className=" border rounded-full h-4 w-4 flex items-center justify-center">
                    +
                  </span>
                  <span className="hover:underline " onClick={addCategory}>
                    add new service category
                  </span>
                </h2>
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
                              <h2 className="text-[#EA2849] cursor-pointer flex items-center space-x-2">
                                <span className=" border rounded-full h-4 w-4 flex items-center justify-center">
                                  +
                                </span>
                                <span
                                  className="hover:underline "
                                  onClick={() => addServices(categories.id)}
                                >
                                  add new service
                                </span>
                              </h2>
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

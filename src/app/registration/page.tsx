"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Registration() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="text-center text-white mt-10">Loading...</p>;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    setFormData(data);
    setShowWarning(true);
  };

  const handleConfirmSubmit = async () => {
    if (!formData) return;

    setError(null);
    setIsLoading(true);
    setShowWarning(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/dashboard");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-[90%] md:w-[50vw] m-auto p-20 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-6 relative"
      >
        <h2 className="text-2xl md:text-3xl col-span-1 md:col-span-2 text-center font-bold text-white">
          Freelancer Registration
        </h2>

        <div className="w-full">
          <label htmlFor="full-name" className="block mb-1 text-white">
            Full Name
          </label>
          <input
            type="text"
            name="full-name"
            id="full-name"
            className="w-full h-10 rounded-lg bg-white text-black px-4 focus:outline-none focus:ring-2 focus:ring-amber-300"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="w-full">
          <label htmlFor="skill" className="block mb-1 text-white">
            Primary Skill
          </label>
          <input
            type="text"
            name="skill"
            id="skill"
            className="w-full h-10 rounded-lg bg-white text-black px-4 focus:outline-none focus:ring-2 focus:ring-amber-300"
            placeholder="Your main skill (e.g., Web Design)"
            required
          />
        </div>

        <div className="w-full">
          <label htmlFor="rate" className="block mb-1 text-white">
            Rate Per Hour ($)
          </label>
          <input
            type="number"
            name="rate"
            id="rate"
            className="w-full h-10 rounded-lg bg-white text-black px-4 focus:outline-none focus:ring-2 focus:ring-amber-300"
            placeholder="0.00"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="w-full">
          <label htmlFor="experience" className="block mb-1 text-white">
            Experience (years)
          </label>
          <input
            type="number"
            name="experience"
            id="experience"
            className="w-full h-10 rounded-lg bg-white text-black px-4 focus:outline-none focus:ring-2 focus:ring-amber-300"
            placeholder="0"
            min="0"
            max="50"
            required
          />
        </div>

        <div className="w-full">
          <label htmlFor="location" className="block mb-1 text-white">
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            className="w-full h-10 rounded-lg bg-white text-black px-4 focus:outline-none focus:ring-2 focus:ring-amber-300"
            placeholder="City, Country"
            required
          />
        </div>

        <div className="w-full">
          <label htmlFor="location" className="block mb-1 text-white">
            Phone Number
          </label>
          <input
            type="text"
            name="phone-no"
            id="phone-no"
            className="w-full h-10 rounded-lg bg-white text-black px-4 focus:outline-none focus:ring-2 focus:ring-amber-300"
            placeholder="123-456-7890"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full h-12 rounded-full font-bold border border-[#EA2849] bg-[#EA2849] hover:text-[#EA2849] hover:bg-transparent px-4 focus:outline-none focus:ring-2 focus:ring-amber-300 col-span-1 md:col-span-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Register Now"
          )}
        </button>

        {error && (
          <p className="text-red-300 text-sm col-span-1 md:col-span-2 text-center">
            {error}
          </p>
        )}
      </form>

      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Service Fee Notice
              </h3>
              <button
                onClick={() => setShowWarning(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 mb-3">
                Before you proceed, please note that we charge a{" "}
                <span className="font-bold">10% service fee</span> on all
                completed projects.
              </p>
              <p className="text-gray-700">
                This fee helps us maintain the platform and provide support
                services.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowWarning(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmSubmit}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 rounded-md text-white font-medium transition-colors"
              >
                I Understand, Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

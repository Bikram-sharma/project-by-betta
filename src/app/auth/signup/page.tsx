"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Signup() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null); 
  const [isLoading, setIsLoading] = useState(false); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });


      const result = await response.json(); 


      if (!response.ok) {
        throw new Error(result.message || "Failed to sign up");
      }

      form.reset();

      Swal.fire({
        title: "🎉 Signup Successful!",
        text: "Welcome to Betta Service! You can now log in and get started.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Let's Go!",
      });
      router.push("/auth/login");

    } catch (error: any) {
      console.error("Error during sign up:", error);
      setError(error.message || "Sign up failed. Please try again.");
    } finally {

      setIsLoading(false); 

    }
  };

  return (
    <div className="bg-[#1373E6] w-[60vw] mx-auto flex justify-between my-10">
      <div className="w-[50%] pl-10 flex items-center ">
        <div className="border-r-2">
          <h1 className="text-2xl m-5 pr-5">Welcome to Betta Service!</h1>
          <p className="mr-10 mb-4 text-center text-xl">
            Betta Service connects skilled professionals with clients who need
            them.
          </p>
          <ul className="list-disc list-inside mb-5">
            <li>Offer your services</li>
            <li> Reach more customers</li>
            <li>Get paid for your skills</li>
          </ul>
          <p>For clients:</p>
          <ul className="list-disc list-inside">
            <li> Find trusted experts</li>
            <li> Book easily</li>
            <li>Chat & collaborate</li>
          </ul>
          <p className="mr-10 mt-10 p-2 border text-center text-2xl">
            Join Betta and grow with us!
          </p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-[30vw] h-[70vh] grid grid-cols-1 grid-rows-5 gap-4 p-8 place-items-center relative "
      >
        <Link
          href={"/auth/login"}
          className="absolute top-4 right-8 hover:underline cursor-pointer"
        >
          Login
        </Link>
        <h2 className="text-3xl">Create an Account</h2>
        <div className="w-full">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full h-10 rounded-lg bg-white text-black px-4 focus:outline-none focus:ring-1 focus:ring-[#3b82f6]"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="w-full">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full h-10 rounded-lg bg-white text-black px-4 focus:outline-none focus:ring-1 focus:ring-[#3b82f6]"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="w-full">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full h-10 rounded-lg  bg-white text-black px-4 focus:outline-none focus:ring-1 focus:ring-[#3b82f6]"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-amber-50 hover:bg-amber-50/90 cursor-pointer h-10 rounded-lg font-bold text-black"

          disabled={isLoading} 

        >
          {isLoading ? "Signing up..." : "Sign up"}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}{" "}
      </form>
    </div>
  );
}

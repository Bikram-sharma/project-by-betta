"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Login() {
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
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email as string,
        password: data.password as string,
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        setError(
          result.error || "Failed to log in. Please check your credentials."
        );
      } else if (result?.url) {
        form.reset();
        console.log(result.url);

        router.push(result.url);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[60vw] mx-auto flex justify-between py-10 ">
      <div className="w-[50%] pl-10 flex items-center ">
        <div className="border-r-2 py-10">
          <h1 className="text-3xl mb-10 pr-5">Welcome to Betta Service!</h1>
          <p className="mr-10 mb-5 text-xl">
            We’re excited to have you again, your skills make a difference!
          </p>
          <p className="text-xl">Log in to:</p>
          <ul className="list-disc list-inside text-lg">
            <li>Manage listings or bookings</li>
            <li> Connect with clients or professionals</li>
            <li> Update skills, profile, and availability</li>
          </ul>
          <p className="mr-10 mt-8 h-10 border text-center text-xl rounded-full px-2 flex items-center justify-center">
            Opportunities are open, dive back in!
          </p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-[30vw] h-[70vh]  rounded-2xl grid grid-cols-1 grid-rows-5 gap-4 px-8 pt-15  place-items-center relative"
      >
        <Link
          href={"/auth/signup"}
          className="absolute top-4 right-8 hover:underline cursor-pointer"
        >
          Sign up
        </Link>
        <h2 className="text-3xl">Login</h2>{" "}
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
          className="w-full mt-10 bg-[#EA2849] border-2 border-[#EA2849] hover:bg-transparent hover:text-[#EA2849] cursor-pointer h-10 rounded-full font-bold"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
}

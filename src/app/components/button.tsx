import Link from "next/link";
import React from "react";

type ButtonProps = {
  link: string;
  children: React.ReactNode;
};

export default function Button({ children, link }: ButtonProps) {
  return (
    <Link href={link || '/'}>
      <button
        className="relative inline-block px-6 py-3 font-medium text-white uppercase tracking-wide rounded-lg 
                   border border-indigo-400 bg-gradient-to-r from-indigo-600 to-purple-600 
                   transition-all duration-300 ease-in-out
                   hover:from-purple-600 hover:to-blue-700 
                   hover:shadow-[0_0_20px_rgba(99,102,241,0.8)] focus:outline-none"
      >
        {/* Glow Effect Background */}
        <span className="absolute inset-0 bg-indigo-400 opacity-0 blur-lg rounded-lg transition-opacity duration-300 hover:opacity-20"></span>

        {/* Button Label */}
        <span className="relative z-10">{children}</span>
      </button>
    </Link>
  );
}

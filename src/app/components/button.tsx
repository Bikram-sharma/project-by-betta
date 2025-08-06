import Link from "next/link";
import React from "react";

type ButtonProps = {
  link: string;
  children: React.ReactNode;
};

export default function Button({ children, link }: ButtonProps) {
  return (
    <Link href={link || "/"}>
      <button
        className={`w-30 h-10 rounded-full cursor-pointer ${
          children === "SignUp" || children === "Dashboard"
            ? "bg-[#EA2849] border border-[#EA2849] text-white hover:bg-transparent hover:text-black"
            : "border border-[#EA2849] hover:bg-[#EA2849] hover:text-white text-black "
        }`}
      >
        <span className="relative z-10">{children}</span>
      </button>
    </Link>
  );
}

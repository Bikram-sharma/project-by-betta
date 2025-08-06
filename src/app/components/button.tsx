import Link from "next/link";
import React from "react";

type ButtonProps ={
    link:string ;
    children:React.ReactNode;
};

export default function Button({children,link} : ButtonProps){

    return(
        <Link href={link || '/'}>
            <button
      onClick={link}
      className="relative inline-block px-6 py-3 font-bold text-white uppercase rounded-md border border-red-500 
                bg-black hover:bg-gray-700 cursor-pointer transition-all duration-300"
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute top-0 left-0 w-full h-full bg-gray-500 opacity-20 blur-lg"></span>
    </button>
        </Link>
    )
}
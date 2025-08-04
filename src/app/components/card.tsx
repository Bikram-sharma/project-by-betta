"use client"
import { useState } from "react";
export default function Card(){
    const [selected, setSelected] = useState("Booked");
    return(
       <div className="max-w-sm mx-auto mt-15 bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-shadow hover:shadow-xl">
  <div className="flex flex-col items-center p-6 mt-10">
    <img
      src="/image/profile.jpg"
      alt="Profile"
      className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-md -mt-12"
    />
    <h2 className="mt-4 text-xl font-semibold text-black">Phuntsho Wangmo</h2>
    <p className="text-sm text-black">Frontend Developer</p>

    <div className="mt-4 text-sm text-black w-full space-y-1">
      <p><span className="font-medium">Experience:</span> 3+ years</p>
      <p><span className="font-medium">Location:</span> Thimphu, Bhutan</p>
      <p><span className="font-medium">Rate:</span> $35/hr</p>
    </div>
    <div className="flex gap-4">
      <button
        onClick={() => setSelected("Booked")}
        className={`px-4 py-2 rounded-full border ${
          selected === "Booked"
            ? "bg-blue-600 text-white"
            : "bg-white text-black"
        }`}
      >
        Book
      </button>
    </div>
  </div>
       
        </div>
    )
}
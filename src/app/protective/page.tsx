'use client';
import { useState } from 'react';

export default function Deskboard(){
    const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
    // Add your search logic here
  };
    return(
        <main>
    <div className="flex items-center justify-center gap-2 mt-2 p-2">
      <input
        type="text"
        placeholder="Type to search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-50 py-2 text-black border rounded-lg focus:outline-none focus:border-blue-100 hover:bg-blue-500"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-500 transition duration-200">
        Search
      </button>
    </div>  
     {/* image and Name */}

    {/* <div className="flex flex-col justify-start items-start h-full w-[200px] bg-[#1373E6] mt-4 p-5 gap-4 text-black">
      <h2 className="text-lg font-bold">Service Panel</h2>

  <nav className="flex flex-col gap-2 w-full ">
    <a href="/messages" className="hover:underline">💬 Messages / Chat</a>
    <a href="/support" className="hover:underline">❓ Help and Support</a>
    <a href="/reviews" className="hover:underline">⭐ Customer Reviews</a>
  </nav>

  <button
    className="flex items-center gap-2 text-black hover:text-red-600 mt-auto"
    onClick={() => {
      // handle logout here
      console.log("Logging out...");
    }}
  >
    🚪 Logout
  </button>
</div> */}

    <div className="flex justify-end">
      <section className="grid grid-cols-3 gap-4 mt-2 p-5">
        <div className="w-110 h-100 border-2 border-gray-300 mt-2"></div>
        <div className="w-110 h-100 border-2 border-gray-300 mt-2"></div>
        <div className="w-110 h-100 border-2 border-gray-300 mt-2"></div>
        <div className="w-110 h-100 border-2 border-gray-300 mt-2"></div>
        <div className="w-110 h-100 border-2 border-gray-300 mt-2"></div>
        <div className="w-110 h-100 border-2 border-gray-300 mt-2"></div>
        <div className="w-110 h-100 border-2 border-gray-300 mt-2"></div>
        <div className="w-110 h-100 border-2 border-gray-300 mt-2"></div>
        <div className="w-110 h-100 border-2 border-gray-300 mt-2"></div>
        <div className="w-110 h-100 border-2 border-gray-300 mt-2"></div>
        <div className="w-110 h-100 border-2 border-gray-300 mt-2"></div>
        <div className="w-110 h-100 border-2 border-gray-300 mt-2"></div>
      </section>
    </div>
    </main>
    )
}
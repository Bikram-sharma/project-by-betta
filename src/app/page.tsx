'use client'
import Header from "@/app/components/navbar";
import Carousel from "@/app/components/carousal";

export default function Home() {
  return (
    <main className="bg-yellow-50 min-h-screen">
      <Header/>
      <div className="mt-1">
          <Carousel/>
        </div>

     <div className="flex mt-2 p-6">
       <div className="h-full w-1/2 p-2 bg-[url('/img/logo1.png')] bg-cover bg-center"
       >
        <h1 className="text-[#7C504A] font-sans font-bold text-4x">About Us</h1>
        <p className="text-black p-2"> An on-demand service marketplace that connects clients with vetted experts (freelancers, contractors,
           professionals) for specific tasks or projects. Clients describe their need, browse available experts,
           schedule the job, and pay securely all inside the app. Experts receive bookings, manage availability, and get paid transparently.</p>
       </div>

       <div className="h-full w-1/2 p-2">
            <h1 className="text-[#7C504A] font-sans font-bold text-4x">Service Provided</h1>
         
        <ol className="list-decimal list-inside space-y-4 text-black p-2">
          <li>
            <span className="font-bold text-[#7C504A]">Home Services</span>
            <ul className="list-disc list-inside ml-6 text-gray-700">
              <li>Installed solar panels for a 3BHK house in Thimphu — completed under budget and within 5 days.</li>
              <li>Fixed electrical wiring in a government office, passing safety inspection on first check.</li>
              <li>Renovated a kitchen with eco-friendly materials and modern fixtures.</li>
              </ul>
          </li>
      
          <li>
            <span className="font-bold text-[#7C504A]">Tech & IT Support</span>
            <ul className="list-disc list-inside ml-6 text-gray-700">
              <li>Developed a responsive e-commerce site for a local handicraft store with integrated payment gateway.</li>
              <li>Set up secure cloud storage for a small business, migrating 2TB of data without downtime.</li>
              <li>Repaired and optimized 15 laptops for a school computer lab.</li>
            </ul>
          </li>

          <li>
            <span className="font-bold text-[#7C504A]"> Creative & Design</span>
            <ul className="list-disc list-inside ml-6 text-gray-700">
              <li>Designed a corporate logo and brand kit for a travel agency.</li>
              <li>Created an illustrated childrens book in Dzongkha and English.</li>
              <li>Produced a promotional video for a tourism event, viewed 20,000+ times on social media</li>
            </ul>
          </li>
        </ol>
         
       </div>
      </div>

    </main>
  );
}
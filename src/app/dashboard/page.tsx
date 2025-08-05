"use client";
import { useState } from "react";
import Link from "next/link";

export default function ServiceProviderDashboard() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    hours: ""
  });

  const services = [
    "",
    "",
    "",
    "",
    "",
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 container mx-auto py-8 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <section className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-1 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Name</label>
                  <p className="text-lg font-semibold">{user.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Email</label>
                  <p className="text-lg font-semibold">{user.email}</p>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-black mb-3">Social Media Links</h2>
                <div className="flex space-x-4">
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    <span className="sr-only">Facebook</span>
                    <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                className="h-6 w-6 fill-blue-600"
              >
                <path d="M576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 440 146.7 540.8 258.2 568.5L258.2 398.2L205.4 398.2L205.4 320L258.2 320L258.2 286.3C258.2 199.2 297.6 158.8 383.2 158.8C399.4 158.8 427.4 162 438.9 165.2L438.9 236C432.9 235.4 422.4 235 409.3 235C367.3 235 351.1 250.9 351.1 292.2L351.1 320L434.7 320L420.3 398.2L351 398.2L351 574.1C477.8 558.8 576 450.9 576 320z" />
              </svg>
                  </a>
                  <a href="#" className="text-pink-600 hover:text-pink-800">
                    <span className="sr-only">Instagram</span>
                    <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                className="h-6 w-6 fill-blue-600"
              >
                <path d="M320.3 205C256.8 204.8 205.2 256.2 205 319.7C204.8 383.2 256.2 434.8 319.7 435C383.2 435.2 434.8 383.8 435 320.3C435.2 256.8 383.8 205.2 320.3 205zM319.7 245.4C360.9 245.2 394.4 278.5 394.6 319.7C394.8 360.9 361.5 394.4 320.3 394.6C279.1 394.8 245.6 361.5 245.4 320.3C245.2 279.1 278.5 245.6 319.7 245.4zM413.1 200.3C413.1 185.5 425.1 173.5 439.9 173.5C454.7 173.5 466.7 185.5 466.7 200.3C466.7 215.1 454.7 227.1 439.9 227.1C425.1 227.1 413.1 215.1 413.1 200.3zM542.8 227.5C541.1 191.6 532.9 159.8 506.6 133.6C480.4 107.4 448.6 99.2 412.7 97.4C375.7 95.3 264.8 95.3 227.8 97.4C192 99.1 160.2 107.3 133.9 133.5C107.6 159.7 99.5 191.5 97.7 227.4C95.6 264.4 95.6 375.3 97.7 412.3C99.4 448.2 107.6 480 133.9 506.2C160.2 532.4 191.9 540.6 227.8 542.4C264.8 544.5 375.7 544.5 412.7 542.4C448.6 540.7 480.4 532.5 506.6 506.2C532.8 480 541 448.2 542.8 412.3C544.9 375.3 544.9 264.5 542.8 227.5zM495 452C487.2 471.6 472.1 486.7 452.4 494.6C422.9 506.3 352.9 503.6 320.3 503.6C287.7 503.6 217.6 506.2 188.2 494.6C168.6 486.8 153.5 471.7 145.6 452C133.9 422.5 136.6 352.5 136.6 319.9C136.6 287.3 134 217.2 145.6 187.8C153.4 168.2 168.5 153.1 188.2 145.2C217.7 133.5 287.7 136.2 320.3 136.2C352.9 136.2 423 133.6 452.4 145.2C472 153 487.1 168.1 495 187.8C506.7 217.3 504 287.3 504 319.9C504 352.5 506.7 422.6 495 452z" />
              </svg>
                  </a>
                  <a href="#" className="text-red-600 hover:text-red-800">
                    <span className="sr-only">YouTube</span>
                    <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                className="h-6 w-6 fill-blue-600"
              >
                <path d="M581.7 188.1C575.5 164.4 556.9 145.8 533.4 139.5C490.9 128 320.1 128 320.1 128C320.1 128 149.3 128 106.7 139.5C83.2 145.8 64.7 164.4 58.4 188.1C47 231 47 320.4 47 320.4C47 320.4 47 409.8 58.4 452.7C64.7 476.3 83.2 494.2 106.7 500.5C149.3 512 320.1 512 320.1 512C320.1 512 490.9 512 533.5 500.5C557 494.2 575.5 476.3 581.8 452.7C593.2 409.8 593.2 320.4 593.2 320.4C593.2 320.4 593.2 231 581.8 188.1zM264.2 401.6L264.2 239.2L406.9 320.4L264.2 401.6z" />
              </svg>
                  </a>
                </div>
              </div>

              <Link 
                href="http://localhost:3000/auth/service-registration"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-center block"
              >
                Register as Service Provider
              </Link>
            </section>

            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-black mb-6">Services We Provide</h2>
              
              <div className="grid grid-cols-1 gap-4 mb-6">
                {services.map((service, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <h3 className="font-medium text-lg text-black">{service}</h3>
                    <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
                      Learn more →
                    </button>
                  </div>
                ))}
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
                Book Service
              </button>
            </section>
          </div>

          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-black mb-6">Contact Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-black mb-1">Phone number</label>
                <p className="text-lg font-semibold">{user.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">Email address</label>
                <p className="text-lg font-semibold">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">Physical Location</label>
                <p className="text-lg font-semibold">{user.location}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">Business hours</label>
                <p className="text-lg font-semibold">{user.hours}</p>
              </div>
            </div>
          </section>
        </div>
      </main>

    </div>
  );
}
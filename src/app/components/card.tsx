"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

type CardProps = {
  name: string;
  skill: string;
  experience: string;
  location: string;
  rate: string;
  id: string;
};

export default function Card({
  name,
  skill,
  experience,
  location,
  rate,
  id,
}: CardProps) {
  const [isBooked, setIsBooked] = useState(false);
  const { data: session } = useSession();
  const [error, setError] = useState<string | null>(null);

  const clickHandler = async () => {
    const result = await Swal.fire({
      title: "Fill the details",
      html: `
        <label for="hours" class="block text-left mb-1 font-semibold text-sm text-gray-700">Number of hours you want to book:</label>
        <input type="number" id="hours" placeholder="numbers of hours" class="w-full mb-3 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />
  
        <label for="amount" class="block text-left mb-1 font-semibold text-sm text-gray-700">Amount:</label>
        <input type="text" id="amount" placeholder="rate * hours" class="w-full mb-3 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" readonly />
  
        <label for="accountNo" class="block text-left mb-1 font-semibold text-sm text-gray-700">Account No:</label>
        <input type="text" id="accountNo" placeholder="Account number" class="w-full mb-3 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />
      `,
      cancelButtonText: "Cancel",
      showCancelButton: true,
      confirmButtonText: "Submit",
      confirmButtonColor: "#EA2849",
      focusConfirm: false,
      customClass: {
        confirmButton: "swal-confirm-btn",
        cancelButton: "swal-cancel-btn",
      },
      didOpen: () => {
        const popup = Swal.getPopup();
        if (!popup) return;

        const hoursInput = popup.querySelector<HTMLInputElement>("#hours");
        const amountInput = popup.querySelector<HTMLInputElement>("#amount");

        if (!hoursInput || !amountInput) return;

        const rateNumber = Number(rate);

        hoursInput.addEventListener("input", () => {
          const hours = Number(hoursInput.value);
          if (!isNaN(hours) && hours > 0) {
            amountInput.value = (rateNumber * hours).toFixed(2);
          } else {
            amountInput.value = "";
          }
        });
      },
      preConfirm: () => {
        const popup = Swal.getPopup();
        if (!popup) return;

        const hoursInput = popup.querySelector<HTMLInputElement>("#hours");
        const amountInput = popup.querySelector<HTMLInputElement>("#amount");
        const accountNoInput =
          popup.querySelector<HTMLInputElement>("#accountNo");

        if (!hoursInput || !amountInput || !accountNoInput) {
          Swal.showValidationMessage("Please fill out all fields.");
          return false;
        }

        const hours = Number(hoursInput.value);
        const amount = amountInput.value;
        const accountNo = accountNoInput.value.trim();

        if (isNaN(hours) || hours <= 0) {
          Swal.showValidationMessage(
            "Please enter a valid number of hours (> 0)."
          );
          return false;
        }
        if (!amount || Number(amount) <= 0) {
          Swal.showValidationMessage("Amount must be greater than 0.");
          return false;
        }
        if (!accountNo) {
          Swal.showValidationMessage("Please enter your account number.");
          return false;
        }

        return { hours, amount, accountNo };
      },
    });

    if (result.isConfirmed && result.value) {
      if (!session?.user.id) {
        Swal.fire("Error", "You must be logged in to book.", "error");
        setIsBooked(false);
        return;
      }
      let otpFromServer: string = "";

      try {
        Swal.fire({
          title: "Fetching OTP...",
          text: "Please wait while we retrieve your OTP.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        const res = await fetch(
          `http://localhost:3000/api/confirmation/otp/${session.user.id}`
        );
        if (!res.ok) {
          const errorData = await res.json();
          setError(errorData.error || "Failed to fetch OTP");
          Swal.fire("Error", errorData.error || "Failed to fetch OTP", "error");
          setIsBooked(false);
          return;
        }
        const data = await res.json();
        otpFromServer = data.OTP;
        setError(null);
      } catch {
        setError("Network error");
        Swal.fire("Error", "Network error", "error");
        setIsBooked(false);
        return;
      }

      const otpResult = await Swal.fire({
        title: "Please enter the OTP sent to your email",
        input: "text",
        inputLabel: "OTP",
        inputPlaceholder: "Enter OTP here",
        showCancelButton: true,
        confirmButtonText: "Verify",
        confirmButtonColor: "#EA2849",
        customClass: {
          confirmButton: "swal-confirm-btn",
          cancelButton: "swal-cancel-btn",
        },
        inputValidator: (value) => {
          if (!value) {
            return "OTP is required!";
          }
          if (!/^\d{4}$/.test(value)) {
            return "Please enter a valid 4-digit OTP.";
          }
        },
      });

      if (otpResult.isConfirmed) {
        if (otpResult.value == otpFromServer) {
          setIsBooked(true);

          Swal.fire({
            title: "Processing your booking...",
            text: "Please wait while we confirm your booking.",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          const response = await fetch(
            "http://localhost:3000/api/confirmation",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                client_id: session.user.id,
                service_provider_id: id,
              }),
            }
          );
          if (!response.ok) {
            Swal.fire("Error", "Booking failed. Please try again.", "error");
            setIsBooked(false);
            return;
          }

          await Swal.fire({
            title: "Booking Confirmed!",
            text: "Your booking has been successfully confirmed. A confirmation email has been sent to your registered email address.",
            icon: "success",
            confirmButtonText: "Okay",
            confirmButtonColor: "#EA2849",
            customClass: {
              confirmButton: "swal-confirm-btn",
              cancelButton: "swal-cancel-btn",
            },
          });
        } else {
          Swal.fire("Error", "Invalid OTP. Please try again.", "error");
          setIsBooked(false);
        }
      } else {
        // User cancelled OTP input, reset booking state
        setIsBooked(false);
      }
    } else {
      // User cancelled details input, reset booking state
      setIsBooked(false);
    }
  };

  return (
    <div className="w-full max-w-xs bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col items-center gap-4">
      <img
        src="/image/profile.jpg"
        alt="Profile"
        className="w-24 h-24 object-cover rounded-full border-4 border-[#EA2849] shadow"
      />

      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500">{skill}</p>
      </div>

      <div className="w-full text-sm text-gray-700 space-y-1">
        <p>
          <span className="font-medium">Experience:</span> {experience}
        </p>
        <p>
          <span className="font-medium">Location:</span> {location}
        </p>
        <p>
          <span className="font-medium">Hourly Rate:</span> {rate}
        </p>
      </div>

      <button
        onClick={clickHandler}
        disabled={isBooked}
        className={`mt-2 w-full py-2 rounded-full font-medium transition-all duration-200 cursor-pointer ${
          isBooked
            ? "bg-green-500 text-white cursor-not-allowed"
            : "bg-[#EA2849] text-white hover:bg-transparent hover:text-[#EA2849] border border-[#EA2849]"
        }`}
      >
        {isBooked ? "Booked" : "Book"}
      </button>
    </div>
  );
}

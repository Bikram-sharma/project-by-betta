import Link from "next/link";
export default function Header() {
  return (
    <header className="bg-[#1373E6] flex items-center justify-between px-8 py-4 shadow w-full sticky top-0 h-[10vh] z-10">
      <div className="flex items-center space-x-2 bg-[url('/image/logo.png')] h-10 w-10  bg-cover bg-center"></div>
      <nav className="space-x-4">
        <Link href="/" className="text-white hover:underline">
          <button className="bg-white text-black rounded-md h-10 w-20 hover:bg-gray-300 cursor-pointer transition">
            Home
          </button>
        </Link>

        <Link href={"/auth/signup"} className="text-white hover:underline">
          <button className="bg-white text-black rounded-md h-10 w-20 hover:bg-gray-300 cursor-pointer transition">
            SignUp
          </button>
        </Link>

        <Link href={"/auth/login"} className="text-white hover:underline">
          <button className="bg-white text-black rounded-md h-10 w-20 hover:bg-gray-300 cursor-pointer transition">
            LogIn
          </button>
        </Link>
      </nav>
    </header>
  );
}

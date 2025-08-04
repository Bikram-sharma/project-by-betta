
export default function Header(){
    return(
        <header className="bg-[#7C504A] flex items-center justify-between p-4 shadow w-full">
       <div className="flex items-center space-x-2 bg-[url('/image/logo.png')] h-20 w-20  bg-cover bg-center">
       </div>
       <nav className="space-x-4">
        <button className="bg-white text-black rounded-md h-10 w-20 hover:bg-gray-300 cursor-pointer transition">Home</button>
        <button className="bg-white text-black rounded-md h-10 w-20 hover:bg-gray-300 cursor-pointer transition">SignUp</button>
        <button className="bg-white text-black rounded-md h-10 w-20 hover:bg-gray-300 cursor-pointer transition">LogIn</button>
       </nav>
        </header>
    )
}
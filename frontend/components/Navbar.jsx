import Image from "next/image";
import { FiShoppingCart } from "react-icons/fi";
import { IoSearchSharp } from "react-icons/io5";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-8 py-3 shadow-md bg-black text-white">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <Link href="/">
          <Image
            src="/logo.png" 
            alt="Logo"
            width={175}
            height={55}
            className="cursor-pointer"
          />
        </Link>
      </div>

      {/* Navigation Section */}
      <div className="flex items-center gap-8 text-sm font-semibold">
        {/* Search Icon */}
        <Link href="/search" className="hover:text-yellow-200 transition duration-200">
          <IoSearchSharp className="text-xl cursor-pointer" />
        </Link>

        {/* Products Link */}
        <Link href="/" className="hover:text-yellow-200 transition duration-200">
          Products
        </Link>

        {/* Cart Icon */}
        <Link href="/cart" className="flex items-center gap-1 hover:text-yellow-200 transition duration-200">
          Order Now
          <FiShoppingCart className="text-lg ml-1" />
        </Link>

        {/* Sign-In Button */}
        <Link href="/about" className="hover:text-yellow-200 transition duration-200">
          About Us
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
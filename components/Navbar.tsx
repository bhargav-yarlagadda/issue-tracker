import Link from 'next/link';
import { FaHome, FaTachometerAlt, FaExclamationCircle } from 'react-icons/fa';


const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-[#0d0d0d] text-gray-300 shadow-md">
      <Link href="/" className="flex items-center text-2xl font-semibold text-[#38bdf8] hover:text-[#60a5fa] transition duration-200">
        <FaHome className="mr-2" />
        Logo
      </Link>
      <div className="flex gap-8 text-lg">
        <Link href="/dashboard" className="flex items-center hover:text-[#60a5fa] transition duration-200">
          <FaTachometerAlt className="mr-2" />
          Dashboard
        </Link>
        <Link href="/issues" className="flex items-center hover:text-[#60a5fa] transition duration-200">
          <FaExclamationCircle className="mr-2" />
          Issue
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

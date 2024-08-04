"use client";
import Link from "next/link";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="sticky top-0 opacity-80 bg-green-900 p-2 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">{`Dennis's Demo`}</div>
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/" className="text-green-300 hover:text-white">
            Home
          </Link>
          <Link href="/listing/1" className="text-green-300 hover:text-white">
            Listing
          </Link>
          <Link href="/custom" className="text-green-300 hover:text-white">
            Create
          </Link>
          <Link
            href="/custom/listing"
            className="text-green-300 hover:text-white"
          >
            Your Characters
          </Link>
          {user ? (
            <div className="relative inline-block text-left">
              <button
                onClick={handleDropdownToggle}
                className="inline-flex justify-center w-full rounded-md border border-green-300 shadow-sm px-4 py-2 bg-green-800 text-sm font-medium text-white hover:bg-green-700 focus:outline-none"
              >
                {user.signInDetails?.loginId}
              </button>
              {dropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <button
                      onClick={signOut}
                      className="block px-4 py-2 text-sm text-green-700 w-full text-left hover:bg-green-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/signin" className="text-green-300 hover:text-white">
              Sign In
            </Link>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={handleMenuToggle}
            className="text-white focus:outline-none"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-green-800 p-4 space-y-4">
          <Link href="/" className="block text-green-300 hover:text-white">
            Home
          </Link>
          <Link
            href="/listing/1"
            className="block text-green-300 hover:text-white"
          >
            Listing
          </Link>
          <Link
            href="/custom"
            className="block text-green-300 hover:text-white"
          >
            Create
          </Link>
          <Link
            href="/custom/listing"
            className="block text-green-300 hover:text-white"
          >
            Your Characters
          </Link>
          {user ? (
            <div className="relative inline-block text-left">
              <span className="inline-flex justify-center w-full rounded-md border border-green-300 shadow-sm px-4 py-2 bg-green-800 text-sm font-medium text-white hover:bg-green-700 focus:outline-none">
                {user.signInDetails?.loginId}
              </span>
              <button
                onClick={signOut}
                className="block px-4 py-2 text-sm rounded-lg text-white w-full text-left hover:bg-red-800 bg-red-500 mt-2"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/signin"
              className="block text-green-300 hover:text-white"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

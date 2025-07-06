"use client";

import { useState } from "react";

import Image from "next/image";

import { signInWithGoogle } from "@/app/provider/AuthProvider";
import { useUser } from "@/app/context/UserContext";
import Link from "next/link";

export default function Navbar() {
  
  const { user, logout, setUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-blue-600">ArkLab AI</div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center gap-6 text-gray-700 font-medium">
          <button className="hover:text-blue-500"><Link href="/">Home</Link></button>
          <button className="hover:text-blue-500"><Link href="/ai-agents">AI Agents</Link></button>
         
          
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-2">
              {user.photoURL && (
                <Image
  src={user.photoURL}
  alt={user.name ?? "User"}
  width={32}
  height={32}
  className="rounded-full border"
/>
              )}
              <button
                onClick={logout}
                className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
  onClick={async () => {
    const loggedInUser = await signInWithGoogle();
    if (loggedInUser) setUser(loggedInUser);
  }}
  className="px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 text-sm"
>
  <span>Login With Google</span>
</button>
          )}
        </div>

        {/* Mobile Menu Button (uses emoji icons) */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-sm px-4 py-3 space-y-3">
          <button className="block text-gray-700">Home</button>
          <button className="block text-gray-700">Features</button>
          <button className="block text-gray-700">Pricing</button>
          <button className="block text-gray-700">Contact</button>

          <div className="pt-3 border-t mt-3">
            {user ? (
              <div className="flex items-center gap-2">
                {user.photoURL && (
                  <Image
  src={user.photoURL}
  alt={user.name ?? "User"}
  width={32}
  height={32}
  className="rounded-full border"
/>
                )}
                <button
                  onClick={logout}
                  className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
  onClick={async () => {
    const loggedInUser = await signInWithGoogle();
    if (loggedInUser) setUser(loggedInUser);
  }}
  className="w-full text-left mt-2 px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 text-sm"
>
  Login With Google
</button>

            )}
          </div>
        </div>
      )}
    </nav>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signInWithGoogle } from "@/app/provider/AuthProvider";
import { useUser } from "@/app/context/UserContext";

export default function Navbar() {
  const { user, logout, setUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const textColor = isHome ? "text-white" : "text-black";
  const hoverColor = isHome ? "hover:text-blue-500" : "hover:text-blue-600";

  return (
    <nav
      className={`fixed w-full z-10 border-b shadow-sm backdrop-blur-sm transition-colors duration-300 ${
        isHome ? "bg-transparent" : "bg-white"
      } ${textColor}`}
    >
      <div className="max-w-7xl mx-auto px-3 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className={`text-2xl font-extrabold ${isHome ? "text-white" : "text-blue-600"}`}>
          ArkLab AI
        </div>

        {/* Desktop Navigation */}
        <div className={`hidden md:flex items-center justify-center gap-6 font-bold text-[20px] ${textColor}`}>
          <Link href="/" className={`${hoverColor}`}>Home</Link>
          <Link href="/ai-agents" className={`${hoverColor}`}>AI Agents</Link>
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
              className="px-4 py-1 rounded bg-blue-500 font-semibold text-lg text-white hover:bg-blue-600"
            >
              <span>Login With Google</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`md:hidden px-4 py-3 space-y-3 ${isHome ? "bg-black/80 text-white" : "bg-white text-black"}`}>
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/ai-agents" onClick={() => setIsOpen(false)}>AI Agents</Link>

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

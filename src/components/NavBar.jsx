"use client";
import { UserButton, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavBar = () => {
  const { userId } = useAuth();
  const isSignedIn = userId ? true : false;
  const path = usePathname();
  return (
    <>
      <div className="flex items-center justify-between p-4 shadow-sm bg-gray-100">
        <Image src={"./logo.svg"} width={160} height={100} alt="logo" />
        <div>
          <ul className="hidden md:flex gap-6">
            <Link href="/dashboard">
              <li
                className={`hover:text-[#4845D2] hover:font-bold transition-all cursor-pointer ${
                  path == "/dashboard" && "text-[#4845d2] font-bold"
                }`}
              >
                Dashboard
              </li>
            </Link>
            <Link href="/questions">
              <li
                className={`hover:text-[#4845D2] hover:font-bold transition-all cursor-pointer ${
                  path == "/questions" && "text-[#4845d2] font-bold"
                }`}
              >
                Questions
              </li>
            </Link>
            <Link href="/upgrade">
              <li
                className={`hover:text-[#4845D2] hover:font-bold transition-all cursor-pointer ${
                  path == "/upgrade" && "text-[#4845d2] font-bold"
                }`}
              >
                Upgrade
              </li>
            </Link>
            <Link href="/howitworks">
              <li
                className={`hover:text-[#4845D2] hover:font-bold transition-all cursor-pointer ${
                  path == "/howitworks" && "text-[#4845d2] font-bold"
                }`}
              >
                How it Works
              </li>
            </Link>
          </ul>
        </div>
        <div>
          {isSignedIn ? (
            <UserButton />
          ) : (
            <Link href="/sign-in">
              <button className="bg-[#4845d2] py-2 px-6 rounded-lg text-white">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;

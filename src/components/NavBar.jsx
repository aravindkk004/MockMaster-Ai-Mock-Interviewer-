"use client";
import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavBar = () => {
  const { user } = useUser();
  const { userId } = useAuth();
  const isSignedIn = userId ? true : false;
  const path = usePathname();
  return (
    <>
      <div className="flex items-center justify-between p-4 shadow-sm bg-gray-100">
        <img src={"../logo.png"} width={180} height={120} alt="logo" />
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
        <div className="px-[10px]">
          {isSignedIn ? (
            <div className="flex items-center gap-[20px]">
              <UserButton
                appearance={{
                  elements: {
                    rootBox: {
                      width: "20px",
                      height: "20px",
                      transform: "scale(1.2)", // Increases size
                    },
                  },
                }}
              />
              <p className="text-sm font-medium hidden md:block">
                {user?.username ||
                  `${user?.firstName || ""} ${user?.lastName || ""}` ||
                  user?.email ||
                  "User"}
              </p>
            </div>
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

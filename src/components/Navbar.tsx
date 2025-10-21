"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUserStore } from "@/store/userStore";
import { parseJwt } from "@/utils/parseJwt";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const { name, username, setUser } = useUserStore();

  useEffect(() => {
    if (!name || !username) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const parsed = parseJwt(token);
        if (parsed) {
          setUser(parsed);
        }
      }
    }
  }, [name, username, setUser]);

  return (
    <nav className="fixed backdrop-blur-md w-full px-5 py-3 z-10 md:px-3 bg-gray-400/30">
      <div className="flex justify-between max-w-3xl mx-auto items-center">
        <Link href="/boards">
          <Image
            src="/icon/logo_bigs.png"
            width={100}
            height={100}
            alt="로고"
          />
        </Link>
        <div className="flex gap-3">
          <div className="text-sm text-black flex flex-col gap-1 items-center">
            <p>{name}</p>
            <p>{username}</p>
          </div>
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}

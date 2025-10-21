"use client";

import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import Button from "./Button";

export default function LogoutButton() {
  const router = useRouter();
  const { resetUser } = useUserStore();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    resetUser();
    router.push("/");
  };

  return (
    <Button className="text-md px-2" onClick={handleLogout}>
      로그아웃
    </Button>
  );
}

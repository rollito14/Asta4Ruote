"use client";
import React from "react";
import { AiOutlineCar } from "react-icons/ai";
import { useParamsStore } from "@/app/hooks/useParamsStore";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const Logo = () => {
  const reset = useParamsStore((state) => state.reset);
  const router = useRouter();
  const pathname = usePathname();
  const sendHome = () => {
    if (pathname !== "/") router.push("/");
    reset();
  };
  return (
    <div>
      <div
        onClick={sendHome}
        className={
          "cursor-pointer flex items-center gap-2 text-3xl font-semibold text-red-500"
        }
      >
        <AiOutlineCar size={34} />
        <div>Asta4Ruote</div>
      </div>
    </div>
  );
};
export default Logo;

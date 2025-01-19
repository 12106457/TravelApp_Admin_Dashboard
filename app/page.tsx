"use client";
import { useRouter } from "next/navigation";
import React from "react";

function page() {
  const route = useRouter();
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <button
        className="p-5 px-20 bg-blue-500 text-white text-xl "
        onClick={() => route.push("/dashboard")}
      >
        Login
      </button>
    </div>
  );
}

export default page;

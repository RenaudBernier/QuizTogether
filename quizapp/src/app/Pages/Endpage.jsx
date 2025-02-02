"use client"; // Add this if using Next.js App Router (needed for hooks)

import { redirect, useRouter } from "next/navigation";

export default function Endpage(){
    const handleNavigation = () => {
        redirect("/Welcome");
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold"></h1>
        <button
          onClick={handleNavigation}
          className="mt-4 border-2 border-blue-500 text-lg px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Go to Welcome
        </button>
      </div>
    )
}
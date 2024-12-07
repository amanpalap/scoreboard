"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Homepage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      router.push("/home");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="w-full flex items-center justify-center border-2 min-h-screen bg-slate-300">
      <div>
        {
          isLoading
            ? <AiOutlineLoading3Quarters className="animate-spin w-20 h-20 text-black" />
            : null
        }
      </div>
    </div>
  );
}

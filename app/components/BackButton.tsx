"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className="mb-4">
      <ChevronLeft />
    </button>
  );
};

export default BackButton;

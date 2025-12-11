"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const Logo3D = dynamic(() => import("@/components/Logo3D"), {
  ssr: false,
});

export default function LazyLogo3D() {
  return (
    <Suspense fallback={<div className="w-full h-96" />}>
      <Logo3D />
    </Suspense>
  );
}

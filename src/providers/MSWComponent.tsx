// src/providers/MSWComponent.tsx

"use client";

import { useEffect, useState } from "react";

export const MSWComponent = ({ children }: { children: React.ReactNode }) => {
  const [mswReady, setMswReady] = useState(
    process.env.NODE_ENV !== "development",
  );
  useEffect(() => {
    const init = async () => {
      // msw/browser는 브라우저 전용 -> SSR 평가 방지 + 메인 번들 분리 위해 동적 import
      const { worker } = await import("@/mocks/browser");
      await worker.start({ onUnhandledRequest: "bypass" });
      setMswReady(true);
    };

    if (!mswReady) {
      init();
    }
  }, [mswReady]);

  if (!mswReady) {
    return null;
  }
  return <>{children}</>;
};

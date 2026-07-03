"use client";

// 복잡한 애니메이션을 제외한 애니메이션 기능들
// 기본 import: 초기 렌더링에 포함해서 보내고 싶습니다.
import { LazyMotion } from "motion/react";

// dynamic import
// 따로 떼서 천천히 와~
const loadFeatures = () => import("@/lib/feature").then((mod) => mod.default);

export default function LazyMotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LazyMotion strict features={loadFeatures}>
      {children}
    </LazyMotion>
  );
}

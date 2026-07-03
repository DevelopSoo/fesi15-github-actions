"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function ScrollCard({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    // 특정 요소 (motion.div)가 뷰포트를 지나가는 진행률
    target: ref,
    // start end: 타겟의 시작점(start)이 뷰포트 아래(end)를 지나는 순간이 진행률이 0이다.
    // end start: 타겟의 끝점(end)이 뷰포트 상단(start)를 지나는 순간이 스크롤 진행률 1이다.
    offset: ["start end", "end start"],
  });

  // opacity 를 scrollYProgress의 진행도에 따라 수정할 예정

  const opacity = useTransform(
    scrollYProgress,
    // 스크롤 진행도가 0 -> 0.3 -> 0.7 -> 1이 될 때~~~~
    [0, 0.3, 0.7, 1],
    [0.3, 1, 1, 0.3],
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    // y좌표가 200 -> 0 -> 0 -> -200 으로 변경될 예정
    [200, 0, 0, -200],
  );

  const scale = useTransform(
    scrollYProgress,
    // 스크롤 진행도가 0.2 -> 0.4 -> 0.6 -> 0.8일 때
    // scale이 0.8 -> 1 -> 1 -> 0.8이 되도록 설정
    [0.2, 0.4, 0.6, 0.8],
    [0.8, 1, 1, 0.8],
  );

  return (
    <motion.div
      ref={ref}
      className="h-64 rounded-xl bg-gray-400 p-6"
      style={{ opacity, y, scale }}
    >
      {children}
    </motion.div>
  );
}

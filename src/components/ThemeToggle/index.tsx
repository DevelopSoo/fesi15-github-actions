"use client";

import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { setTheme } = useTheme();
  return (
    <div className="flex gap-2">
      <button
        className="rounded-md border border-gray-300 p-2 dark:text-white"
        onClick={() => setTheme("system")}
      >
        시스템
      </button>
      <button
        className="rounded-md border border-gray-300 p-2 dark:text-white"
        onClick={() => setTheme("dark")}
      >
        다크
      </button>
      <button
        className="rounded-md border border-gray-300 p-2 dark:text-white"
        onClick={() => setTheme("light")}
      >
        라이트
      </button>
    </div>
  );
}

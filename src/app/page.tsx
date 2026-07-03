// src/app/page.tsx

import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>메인 페이지</h1>
      <Link className="text-blue-500 underline" href="/login">
        로그인
      </Link>
    </div>
  );
}

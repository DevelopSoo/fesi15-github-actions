// src/app/about/page.tsx

import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is the about page of our Next.js application.</p>
      <Link className="text-blue-400 underline" href="/">
        Home
      </Link>
    </div>
  );
}

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// mypage를 요청한다 -> 미들웨어 (proxy)가 실행되서 중간 처리를 한다 -> mypage 에 접속한다.

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// mypage 페이지에 접근할 때 이 함수를 실행하세요
export const config = {
  matcher: ["/mypage"],
};

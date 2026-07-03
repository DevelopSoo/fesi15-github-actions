import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";
export async function POST(request: NextRequest) {
  try {
    // 프론트엔드에서 요청보낸 body
    // 로그인 정보
    const body = await request.json();

    // 전달 -> 외부 백엔드
    const response = await fetch(`${BACKEND_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    const cookieStore = await cookies();

    cookieStore.set("token", data.token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24시간
      path: "/",
    }); // 토큰을 제외한 응답 반환

    const { message, user } = data;

    return NextResponse.json({ message, user });
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}

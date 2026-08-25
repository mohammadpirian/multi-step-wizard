import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("body", body);

    return NextResponse.json(
      {
        success: true,
        message: "Registration completed",
        data: body,
      },
      {
        status: 200,
      },
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid request",
      },
      {
        status: 400,
      },
    );
  }
}

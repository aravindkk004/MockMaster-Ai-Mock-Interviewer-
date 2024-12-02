import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { connectToDb } from "@/libs/connectToDb";
import { MockInterview } from "@/models/Schema";

export async function GET(req) {
  const { userId } = getAuth(req);
  try {
    await connectToDb();
    const details = await MockInterview.find({ userId: userId });
    return NextResponse.json({ details }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error while starting the interview" },
      { status: 500 }
    );
  }
}

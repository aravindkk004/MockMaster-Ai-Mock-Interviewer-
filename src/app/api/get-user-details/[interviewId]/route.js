import { connectToDb } from "@/libs/connectToDb";
import { MockInterview } from "@/models/Schema";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req, { params }) {
  const { userId } = getAuth(req);
  const { interviewId } = await params;
  console.log("Interview Id is:", interviewId);
  try {
    await connectToDb();
    const details = await MockInterview.findOne({
      userId: userId,
      InterviewId: interviewId,
    });
    return NextResponse.json({ details }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error while starting the interview" },
      { status: 500 }
    );
  }
}

import { connectToDb } from "@/libs/connectToDb";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { v4 as uuidv4 } from "uuid";
import { MockInterview } from "@/models/Schema";

export async function POST(req) {
  const { jsonResponse, jobPosition, jobDesc, jobExperience } =
    await req.json();
  try {
    await connectToDb();
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const interviewId = uuidv4();
    const createdDoc = await MockInterview.create({
      userId: userId,
      jsonMockResp: jsonResponse,
      jobPosition: jobPosition,
      jobDesc: jobDesc,
      jobExperience: jobExperience,
      InterviewId: interviewId,
    });
    console.log(createdDoc);
    return NextResponse.json({ interviewId }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error while starting the interview" },
      { status: 500 }
    );
  }
}

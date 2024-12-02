import { connectToDb } from "@/libs/connectToDb";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { UserAnswer } from "@/models/Schema";

export async function GET(req, {params}) {
  const { userId } = getAuth(req);
  const { interviewId } = await params;
  try {
    await connectToDb();
    const details = await UserAnswer.findOne({
      userId: userId,
      mockIdRef: interviewId,
    });
    console.log(details);
    return NextResponse.json({ details }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
}

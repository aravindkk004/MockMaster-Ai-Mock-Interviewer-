import { NextResponse } from "next/server";
import { connectToDb } from "@/libs/connectToDb";
import { getAuth } from "@clerk/nextjs/server";
import { UserAnswer } from "@/models/Schema";

export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    const {
      interviewId,
      index,
      question,
      correctAns,
      userAns,
      feedback,
      rating,
    } = await req.json();
    if (
      !interviewId ||
      !question ||
      !correctAns ||
      !userAns ||
      !feedback ||
      !rating
    ) {
      return NextResponse.json(
        { message: "Data insufficient" },
        { status: 401 }
      );
    }
    console.log("The current Index is", index);
    await connectToDb();
    // const creation = await UserAnswer.create({
    //   userId: userId,
    //   mockIdRef: interviewId,
    //   question: question,
    //   correctAns: correctAns || "",
    //   userAns: userAns || "",
    //   feedback: feedback || "",
    //   rating: rating,
    // });

    const userAnswer = await UserAnswer.findOne({
      userId: userId,
      mockIdRef: interviewId,
    });
    if (!userAnswer) {
      const emptyArray = Array(index + 1).fill(null);
      await UserAnswer.create({
        userId,
        mockIdRef: interviewId,
        question: emptyArray,
        correctAns: emptyArray,
        userAns: emptyArray,
        feedback: emptyArray,
        rating: emptyArray,
      });
    } else {
      ["question", "correctAns", "userAns", "feedback", "rating"].forEach(
        (field) => {
          if (!userAnswer[field] || userAnswer[field].length <= index) {
            userAnswer[field] = userAnswer[field] || [];
            while (userAnswer[field].length <= index) {
              userAnswer[field].push(null);
            }
          }
        }
      );
      userAnswer.question[index] = question;
      userAnswer.correctAns[index] = correctAns || "";
      userAnswer.userAns[index] = userAns || "";
      userAnswer.feedback[index] = feedback || "";
      userAnswer.rating[index] = rating || null;
      await userAnswer.save();
    }

    console.log("Document updated successfully.");
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error while submitting" },
      { status: 500 }
    );
  }
}

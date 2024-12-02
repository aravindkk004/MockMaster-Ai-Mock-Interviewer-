"use client";
import axios from "axios";
import { RiExpandUpDownLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { chatSession } from "@/utils/AiModal";

export default function Home() {
  const [feedbackList, setFeedbackList] = useState();
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
  const router = useRouter();
  const params = useParams();
  const [score, setScore] = useState(0);
  const interviewId = params?.interviewId;

  const getFeedBack = async () => {
    try {
      const response = await axios.get(`/api/get-feedback/${interviewId}`);
      if (response.status === 200) {
        console.log(response.data.details); // Confirm the structure of the response
        setFeedbackList(response.data.details);
      }
    } catch (error) {
      toast.error("Error fetching details");
    }
  };

  useEffect(() => {
    const getRating = async () => {
      let rating = 0;
      if (feedbackList?.rating?.length > 0) {
        for (let index = 0; index < feedbackList.rating.length; index++) {
          rating += feedbackList.rating[index];
        }
        setScore(Math.round(rating / feedbackList.rating.length));
      } else {
        setScore(0);
      }
    };

    getRating();
  }, [feedbackList]);

  useEffect(() => {
    getFeedBack();
  }, []);

  const handleQuestionClick = (index) => {
    setSelectedQuestionIndex(index === selectedQuestionIndex ? null : index); // Toggle question details
  };

  return (
    <div className="p-10">
      {feedbackList && feedbackList.question.length <= 0 ? (
        <h2 className="font-bold text-xl text-gray-500">
          No Interview Feedback Record Found
        </h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500">Congratulation!</h2>
          <h2 className="font-bold text-2xl">
            Here is your interview feedback
          </h2>

          <h2 className="text-primary text-lg my-3">
            Your overall interview rating: <strong>{score}/10</strong>
          </h2>

          <h2 className="text-sm text-gray-500">
            Find below interview question with correct answer, Your answer and
            feedback for improvement
          </h2>

          {/* feedbacks */}
          {feedbackList &&
          feedbackList.question &&
          feedbackList.question.length > 0 ? (
            <div className="mt-7">
              {feedbackList.question.map((question, index) => (
                <div key={index} className="mt-7">
                  <div
                    className="p-2
             bg-gray-100 rounded-lg flex justify-between
            my-2 text-left gap-7 w-full cursor-pointer"
                    onClick={() => handleQuestionClick(index)}
                  >
                    <span>{question}</span>
                    <div>
                      <RiExpandUpDownLine size={20} />
                    </div>
                  </div>
                  {selectedQuestionIndex === index && (
                    <div className="flex flex-col gap-2">
                      <h2 className="text-red-500 p-2 border rounded-lg">
                        <strong>Rating:</strong> {feedbackList.rating[index]}
                      </h2>
                      <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                        <strong>Your Answer: </strong>{" "}
                        {feedbackList.userAns[index]}
                      </h2>
                      <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                        <strong>Correct Answer: </strong>{" "}
                        {feedbackList.correctAns[index]}
                      </h2>
                      <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-[#4845d2]">
                        <strong>Feedback: </strong>{" "}
                        {feedbackList.feedback[index]}
                      </h2>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No feedback available.</p>
          )}
        </>
      )}
      <button
        className="bg-[#4845d2] text-white py-2 px-5 rounded-lg my-[20px]"
        onClick={() => router.replace("/dashboard")}
      >
        Go Home
      </button>
    </div>
  );
}

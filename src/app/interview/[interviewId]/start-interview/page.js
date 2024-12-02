"use client";
import QuestionsSection from "@/components/interview/QuestionsSection";
import RecordAnswerSection from "@/components/interview/RecordAnswerSection";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const params = useParams();
  const interviewId = params?.interviewId;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `/api/get-user-details/${interviewId}`
        );
        if (response.status == 200) {
          const jsonMockResp = JSON.parse(response.data.details.jsonMockResp);
          console.log(jsonMockResp);
          setMockInterviewQuestion(jsonMockResp);
          setInterviewData(response.data.details);
        }
      } catch (error) {
        toast.error(error);
      }
    };

    fetchDetails();
  }, []);
  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Questions  */}
          <QuestionsSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
          />

          {/* Video/ Audio Recording  */}
          <RecordAnswerSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            interviewData={interviewData}
          />
        </div>

        <div className="flex justify-end gap-6 mb-[40px]">
          {activeQuestionIndex > 0 && (
            <button
              className="bg-[#4845d2] py-2 px-5 text-white rounded-lg"
              onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
            >
              Previous Question
            </button>
          )}
          {activeQuestionIndex != mockInterviewQuestion?.length - 1 && (
            <button
              className="bg-[#4845d2] py-2 px-5 text-white rounded-lg"
              onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
            >
              Next Question
            </button>
          )}
          {activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
            <Link
              href={"/interview/" + interviewId + "/feedback"}
            >
              <button className="bg-[#4845d2] py-2 px-5 text-white rounded-lg">
                End Interview
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { chatSession } from "@/utils/AiModal";

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {
  const params = useParams();
  const interviewId = params?.interviewId;
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (results?.length > 0) {
      const transcript = results.map((result) => result.transcript).join(" ");
      setUserAnswer(transcript);
    }
  }, [results]);

  const handleStartStopRecording = () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      setUserAnswer("");
      startSpeechToText();
    }
  };

  const aiRespone = async () => {
    const feedbackPrompt =
      "Question:" +
      mockInterviewQuestion[activeQuestionIndex]?.question +
      ", User Answer:" +
      userAnswer +
      ", Depends on question and user answer for given interview question " +
      " please give us rating for the answer and feedback as area of improvement if any " +
      "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

    return await chatSession.sendMessage(feedbackPrompt);
  };

  const updateToDB = async () => {
    setLoading(true);
    try {
      const result = await aiRespone();
      const mockJsonResp = result.response
        ?.text()
        ?.replace("```json", "")
        ?.replace("```", "");
      const JsonFeedbackResp = JSON.parse(mockJsonResp);

      const response = await axios.post(`/api/interview/submit-answer`, {
        interviewId: interviewId,
        index: activeQuestionIndex,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
      });
      if (response.status == 200) {
        setResults([]);
        setUserAnswer("");
        toast.success("Submitted Successfully. You can go to nextQuestion");
      } else {
        toast.error("Error Submitting Your Answers");
      }
    } catch (error) {
      toast.error("An error occurred while submitting your answer.");
      console.log(error); // Log error for debugging
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAnswer = async () => {
    if (userAnswer.trim().length < 5) {
      toast.error("Answer too short. Please provide more details.");
      return;
    }

    setLoading(true);
    try {
      await updateToDB();
      setUserAnswer("");
    } catch (error) {
      toast.error("Failed to save answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      {/* Webcam Section */}
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5 relative">
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          className="absolute"
          alt="webcam placeholder"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 500,
            width: 500,
            zIndex: 10,
          }}
        />
      </div>

      {/* Recording Button */}
      <div className="flex items-center gap-[20px]">
        <button
          disabled={loading}
          className="my-10 bg-transparent border py-2 px-5 rounded-md flex gap-2 items-center"
          onClick={handleStartStopRecording}
        >
          {isRecording ? (
            <h2 className="text-red-600 animate-pulse flex gap-2 items-center">
              <StopCircle />
              Stop Recording
            </h2>
          ) : (
            <h2 className="text-[#4845d2] flex gap-2 items-center">
              <Mic /> Record Answer
            </h2> 
          )}
        </button>
        {userAnswer && (
          <button
            className="my-10 bg-green-500 text-white border py-2 px-5 rounded-md flex gap-2 items-center"
            onClick={handleSaveAnswer}
          >
            {loading ? "Submitting" : "Submit"}
          </button>
        )}
      </div>
      {error && (
        <p className="text-red-500 mt-3">
          Error: {error}. Please ensure your microphone is enabled.
        </p>
      )}
    </div>
  );
};

export default RecordAnswerSection;

import { useRouter } from "next/navigation";
import React from "react";

function InterviewItemCard({ interview, interviewId }) {
  const router = useRouter();

  const onStart = () => {
    router.push("/interview/" +interviewId);
  };

  const onFeedbackPress = () => {
    router.push("/interview/" + interviewId + "/feedback");
  };

  return (
    <div className="border shadow-sm rounded-lg p-3">
      <h2 className="font-bold text-[#4845d2] text-lg">
        {interview?.jobPosition}
      </h2>
      <h2 className="text-md text-gray-600">
        {interview?.jobExperience} Years of Experience
      </h2>
      <h2 className="text-xs text-gray-400">
        Created At:{" "}
        {new Date(interview.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </h2>
      <div className="flex justify-between mt-2 gap-5">
        <button
          size="sm"
          variant="outline"
          className="w-full bg-gray-100 rounded-lg"
          onClick={onFeedbackPress}
        >
          Feedback
        </button>
        <button
          className="bg-[#4845d2] py-2 px-5 w-full text-white rounded-lg"
          size="sm"
          onClick={onStart}
        >
          Start
        </button>
      </div>
    </div>
  );
}

export default InterviewItemCard;

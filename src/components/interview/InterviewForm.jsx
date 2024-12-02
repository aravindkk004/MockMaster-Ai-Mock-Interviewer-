"use client";
import React, { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { chatSession } from "@/utils/AiModal";

const InterviewForm = ({ handleCloseModal }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [jsonResponse, setJsonResponse] = useState([]);

  async function getInputFromAI(position, desc, exp) {
    const InputPrompt =
      "Job position: " +
      position +
      ", Job Description: " +
      desc +
      ", Years of Experience : " +
      exp +
      " , Depends on Job Position, Job Description & Years of Experience give us 5 Interview question along with Answer in JSON format, Give us question and answer field on JSON";
    return await chatSession.sendMessage(InputPrompt);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await getInputFromAI(jobPosition, jobDesc, jobExperience);
    const MockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    console.log(MockJsonResp)
    setJsonResponse(MockJsonResp);
    try {
      console.log("before api")
      const response = await axios.post("/api/user-details/", {
        jsonResponse: MockJsonResp,
        jobPosition,
        jobDesc,
        jobExperience,
      });
      if (response.status === 200) {
        const { interviewId } = response.data;
        console.log("Interview ID:", interviewId);
        router.push(`/interview/${interviewId}`);
      } else {
        toast.error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to start the interview!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="">
        <h2 className="text-xl font-bold">
          Tell us more about your job interviwing
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <h2 className="text-gray-400">
              Add Details about yout job position/role, Job description and
              years of experience
            </h2>
            <div className="mt-7 my-3">
              <label className="text-gray-600">Job Role/Job Position</label>
              <input
                placeholder="Ex. Full Stack Developer"
                required
                value={jobPosition}
                className="w-full border border-gray-200 p-2 rounded-lg"
                onChange={(event) => setJobPosition(event.target.value)}
              />
            </div>
            <div className=" my-3">
              <label className="text-gray-600">
                Job Description/ Tech Stack (In Short)
              </label>
              <textarea
                value={jobDesc}
                placeholder="Ex. React, Angular, NodeJs, MySql etc"
                required
                className="w-full border border-gray-200 p-2 rounded-lg"
                onChange={(event) => setJobDesc(event.target.value)}
              ></textarea>
            </div>
            <div className=" my-3">
              <label className="text-gray-600">Years of experience</label>
              <input
                value={jobExperience}
                placeholder="Ex.5"
                type="number"
                max="100"
                required
                className="w-full border border-gray-200 p-2 rounded-lg"
                onChange={(event) => setJobExperience(event.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-[20px] items-center">
            <button
              className="text-gray-700 px-5 py-2 mt-3"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              className="bg-[#4845d2] text-white py-2 px-5 rounded-lg mt-3"
              type="submit"
            >
              {loading ? (
                <div className="flex items-center gap-[10px]">
                  <LoaderCircle className="animate-spin" />{" "}
                  <p>Generating from AI</p>
                </div>
              ) : (
                "Start Interview"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default InterviewForm;

"use client";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import { MdOutlineStopScreenShare } from "react-icons/md";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import axios from "axios";

export default function InterviewId() {
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const params = useParams();
  const interviewId = params?.interviewId;
  const [interviewData, setInterviewdata] = useState();
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const result = await axios.get(`/api/get-user-details/${interviewId}`);
        if (result.status == 200) {
          console.log(result.data.details);
          setInterviewdata(result.data.details);
        } else {
          toast.error("Error fetching Interview");
        }
      } catch (error) {
        toast.error(error);
      }
    };
    fetchUserDetails();
  }, []);
  return (
    <>
      <div className="my-10 ">
        <h2 className="font-bold text-2xl">Let&apos;s Get Started</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col my-5 gap-5 ">
            <div className="flex flex-col p-5 rounded-lg border gap-5">
              <h2 className="text-lg">
                <strong>Job Role/Job Position:</strong>{" "}
                {interviewData?.jobPosition}{" "}
              </h2>
              <h2 className="text-lg">
                <strong>Job Description/Tech Stack:</strong>{" "}
                {interviewData?.jobDesc}{" "}
              </h2>
              <h2 className="text-lg">
                <strong>Years of Experience:</strong>{" "}
                {interviewData?.jobExperience}{" "}
              </h2>
            </div>
            <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
              <h2 className="flex gap-2 items-center text-yellow-500">
                {" "}
                <Lightbulb />
                <strong>Information</strong>
              </h2>
              <h2 className="mt-3 text-yellow-500">
                Enable Video Web Cam and Microphone to Start your AI Generated
                Mock Interview, it Has 5 question which you can answer and at
                the last you will get the report on the basis of your answer,
                NOTE: We never record your video, Web cam access you can disable
                at any time if you want.
              </h2>
            </div>
          </div>
          <div>
            {webCamEnabled ? (
              <div className="flex flex-col items-center">
                <Webcam
                  onUserMedia={() => setWebCamEnabled(true)}
                  onUserMediaError={() => setWebCamEnabled(false)}
                  mirrored={true}
                  style={{
                    height: 400,
                    width: 400,
                  }}
                />
                <button
                  className="flex items-center gap-[10px] bg-gray-200 py-2 px-5 rounded-lg"
                  onClick={() => setWebCamEnabled(false)}
                >
                  <MdOutlineStopScreenShare />
                  Stop Video
                </button>
              </div>
            ) : (
              <>
                <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
                <button
                  variant="ghost"
                  className="w-full"
                  onClick={() => setWebCamEnabled(true)}
                >
                  Enable Web Cam and Microphone
                </button>
              </>
            )}
          </div>
        </div>
        <div className="flex justify-end items-end">
          <Link href={"/interview/" + interviewId + "/start-interview"}>
            <button className="bg-[#4845d2] text-white py-2 px-5 rounded-lg mt-5">
              Start Interview
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

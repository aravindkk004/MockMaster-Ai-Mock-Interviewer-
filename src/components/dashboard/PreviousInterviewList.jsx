"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import InterviewItemCard from "../interview/InterviewItemCard";

const PreviousInterviewList = () => {
  const [interviewList, setInterviewList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await axios.get(`/api/get-interviews`);
        if (response.status === 200) {
          console.log("The response is", response.data.details);
          setInterviewList(response.data.details || []);
        }
      } catch (error) {
        toast.error("Error fetching Interview Details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {isLoading
          ? Array(4)
              .fill(null)
              .map((_, index) => (
                <div
                  key={`placeholder-${index}`}
                  className="h-[100px] w-full bg-gray-200 animate-pulse rounded-lg"
                ></div>
              ))
          : interviewList?.length > 0
          ? interviewList.map((interview, index) => (
              <InterviewItemCard
                interview={interview}
                key={`interview-${index}`}
                interviewId = {interview.InterviewId}
              />
            ))
          : [1, 2, 3, 4].map((item, index) => (
              <div className="h-[100px] w-full bg-gray-200 animate-pulse rounded-lg " key={index}></div>
            ))}
      </div>
    </div>
  );
};

export default PreviousInterviewList;

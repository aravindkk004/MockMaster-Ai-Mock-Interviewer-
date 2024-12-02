import React from "react";

const PreviousInterviewList = () => {
  return (
    <>
      <div>
        <h2 className="font-medium text-xl">Previous Mock Interview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
          {[1, 2, 3, 4].map((item, index) => (
            <div key={index} className="h-[100px] w-full bg-gray-200 animate-pulse rounded-lg "></div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PreviousInterviewList;

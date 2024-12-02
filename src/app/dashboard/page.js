import NavBar from "@/components/NavBar";
import AddNewInterview from "@/components/dashboard/AddNewInterview";
import PreviousInterviewList from "@/components/dashboard/PreviousInterviewList";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="mx-5 md:mx-20 lg:mx-36">
        <div className="p-10">
          <h2 className="font-bold text-3xl text-[#4845d2]">Dashboard</h2>
          <h2 className="text-gray-500">
            Create and Start your AI Mockup Interview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-5">
            <AddNewInterview />
          </div>
          <PreviousInterviewList />
        </div>
      </div>
    </>
  );
}

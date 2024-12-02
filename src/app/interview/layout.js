import NavBar from "@/components/NavBar";

function InterviewLayout({ children }) {
    return (
      <div>
        <NavBar />
        <div className="mx-5 md:mx-20 lg:mx-36">{children}</div>
      </div>
    );
  }
  
  export default InterviewLayout;
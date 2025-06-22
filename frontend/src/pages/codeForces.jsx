import CFHandleInput from "../components/handleInput";
import CfData from "../components/cfData";
import CfSubmissions from "../components/cfHeatmap";
import CfSubmissionsheat from "../components/cfSubmissions";
import CfRatingGraph from "../components/cfRatingGraph";
import CFProblemSolved from "../components/cfProblemSolved";
// import CFVerdictDistribution from "../components/CFVerdictDistribution";
import CFStreakTracker from "../components/CFStreakTracker";
import CFFastestAccepted from "../components/CFFastestAccepted";
import FloatingPersonalizeButton from "../components/FloatingPersonalizeButton";
import CFContestSolveTime from "../components/CFContestTime";
import { useCfStorestemp } from "../store/useCfStorestemp";
import Sidebar  from "../components/Sidebar.jsx";
// import Loader from "../components/Loader";
import { useAuthStore } from "../store/useAuthStore.js";
import { Loader } from "lucide-react";

const CodeForces = () => {
  const {isLoading } = useCfStorestemp();
  const {authUser} = useAuthStore();
  return (
    <div className="min-h-screen bg-gray-50 pt-[4%]  flex">
    {!authUser.cfHandle && <CFHandleInput />}
  {/* Main Content */}
    {authUser.cfHandle && <Sidebar/>}
  <main className=" flex-1  max-w-7xl mx-auto">
    {isLoading && <div className="flex justify-center items-center h-screen">
          <Loader className="w-10 h-10 text-orange-500 animate-spin" />
        </div>}

    {authUser.cfHandle && (
      <>
        <div className="">
          <div className="bg-white p-4 rounded-xl shadow-sm col-span-1">
            <CfData />
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm col-span-1">
            <CFStreakTracker />
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm col-span-1">
            <CFContestSolveTime />
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm col-span-2">
            <CfRatingGraph />
          </div>


          <div className="bg-white p-4 rounded-xl shadow-sm col-span-1">
            <CFFastestAccepted />
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm col-span-1">
            <CFProblemSolved />
          </div>

          {/* <div className="bg-white p-4 rounded-xl shadow-sm col-span-1"> */}
            {/* <CFVerdictDistribution />
          </div> */}

          <div className="bg-white p-4 rounded-xl shadow-sm col-span-2">
            <CfSubmissions />
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm col-span-2">
            <CfSubmissionsheat />
          </div>
        </div>

        <FloatingPersonalizeButton />
      </>
    )}
  </main>
</div>

  )
};

export default CodeForces;

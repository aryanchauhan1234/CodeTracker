import CFHandleInput from "../components/handleInput";
import CfData from "../components/cfData";
import CfSubmissions from "../components/cfHeatmap";
import CfSubmissionsheat from "../components/cfSubmissions";
import CfRatingGraph from "../components/cfRatingGraph";
import CFProblemSolved from "../components/cfProblemSolved";
import CFVerdictDistribution from "../components/cfVerdictDistribution";
import CFStreakTracker from "../components/CFStreakTracker";
import CFFastestAccepted from "../components/CFFastestAccepted";
import FloatingPersonalizeButton from "../components/FloatingPersonalizeButton";
// import FriendComparison from "../components/FriendComparison";
// import AddFreind from "../components/AddFreind"
import CFContestSolveTime from "../components/CFContestTime";
import { useCfStorestemp } from "../store/useCfStorestemp";
import Loader from "../components/Loader"; // ✅ import loader

const CodeForces = () => {
  const { user, isLoading } = useCfStorestemp();

  return (
    <div className="min-h-screen bg-gray-100 py-10 pt-[65px] relative">

      {isLoading && <Loader />} {/* ✅ loader on top of everything */}

      {!user.cfHandle && <CFHandleInput />}
      {user.cfHandle && (
        <>
          {/* <CFStreakTracker /> */}
          <CfData />
          <CFContestSolveTime />
          <CfRatingGraph />
          <CfSubmissions />
          <CFProblemSolved />
          <CFVerdictDistribution />
          <CfSubmissionsheat />
          <CFFastestAccepted />
          <FloatingPersonalizeButton />
          {/* <FriendComparison /> */}
          {/* <AddFreind /> */}
        </>
      )}
    </div>
  );
};

export default CodeForces;

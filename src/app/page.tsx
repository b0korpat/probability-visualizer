import { MathStepPlayer } from "@/components/visualizer/MathStepPlayer";
import { shirtsProblem } from "@/data/problems/shirts-problem";
import { extendedProblems } from "@/data/problems/extended-problems";
import { sportsVillageProblem } from "@/data/problems/class-problems";

export default function Page() { return <MathStepPlayer problem={shirtsProblem} problems={[shirtsProblem, sportsVillageProblem, ...extendedProblems]} />; }

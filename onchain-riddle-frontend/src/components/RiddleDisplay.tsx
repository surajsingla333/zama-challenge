// File: frontend/src/components/RiddleDisplay.tsx
import { useReadContract } from "wagmi";
import { RIDDLE_ADDRESS, RIDDLE_ABI } from "../lib/contract";

export default function RiddleDisplay() {
  const { data, error, isPending } = useReadContract({
    address: RIDDLE_ADDRESS,
    abi: RIDDLE_ABI,
    functionName: "riddle",
  });

  console.log("Riddle data:", data);

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">
        Current Riddle:
      </h2>
      {isPending && <p className="text-gray-500">Loading riddle...</p>}
      {error && <p className="text-red-500">Failed to load riddle.</p>}
      {typeof data === "string" && (
        <p className="text-gray-800 text-lg">{data}</p>
      )}
    </div>
  );
}

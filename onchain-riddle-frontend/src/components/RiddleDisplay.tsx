// File: frontend/src/components/RiddleDisplay.tsx
import { useState, useEffect } from "react";
import { useReadContract, useWatchContractEvent } from "wagmi";
import { RIDDLE_ADDRESS, RIDDLE_ABI } from "../lib/contract";

export default function RiddleDisplay() {
  const { data, error, isPending } = useReadContract({
    address: RIDDLE_ADDRESS,
    abi: RIDDLE_ABI,
    functionName: "riddle",
  });
  const [riddleData, setRiddleData] = useState<string>("");

  useEffect(() => {
    if (data && typeof data === "string") {
      setRiddleData(data);
    }
  }, [data]);

  useWatchContractEvent({
    address: RIDDLE_ADDRESS,
    abi: RIDDLE_ABI,
    eventName: "RiddleSet",
    onLogs(logs: any) {
      console.log("New riddle set!", logs);
      setRiddleData(logs[0].args?.riddle || "");
    },
  });

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">
        Current Riddle:
      </h2>
      {isPending && <p className="text-gray-500">Loading riddle...</p>}
      {error && <p className="text-red-500">Failed to load riddle.</p>}
      <p className="text-gray-800 text-lg">{riddleData}</p>
    </div>
  );
}

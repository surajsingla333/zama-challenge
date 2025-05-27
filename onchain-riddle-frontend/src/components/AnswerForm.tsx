// File: frontend/src/components/AnswerForm.tsx
import { useEffect, useState } from "react";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
  useWatchContractEvent,
  useAccount,
} from "wagmi";
import { RIDDLE_ADDRESS, RIDDLE_ABI } from "../lib/contract";
import { ZeroAddress } from "ethers";

export default function AnswerForm() {
  const { address } = useAccount();
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [winnerDataFromLogs, setWinnerDataFromLogs] = useState({
    user: "",
    correct: false,
  });
  const { data: hash, writeContract, isPending, reset } = useWriteContract();

  const { isLoading: txLoading, isSuccess: txSuccess } =
    useWaitForTransactionReceipt({
      hash,
    });

  useWatchContractEvent({
    address: RIDDLE_ADDRESS,
    abi: RIDDLE_ABI,
    eventName: "AnswerAttempt",
    onLogs(logs: any) {
      console.log("New logs, somebody attempted to answer", logs);
      setWinnerDataFromLogs(logs[0].args);
    },
  });

  useWatchContractEvent({
    address: RIDDLE_ADDRESS,
    abi: RIDDLE_ABI,
    eventName: "RiddleSet",
    onLogs(logs: any) {
      console.log("New riddle set! Resetting form", logs);
      setWinnerDataFromLogs({
        user: "",
        correct: false,
      });
      reset();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    writeContract({
      address: RIDDLE_ADDRESS,
      abi: RIDDLE_ABI,
      functionName: "submitAnswer",
      args: [answer],
    });
    setSubmitted(true);
  };

  const { data, error } = useReadContract({
    address: RIDDLE_ADDRESS,
    abi: RIDDLE_ABI,
    functionName: "winner",
  });

  useEffect(() => {
    if (data && data === ZeroAddress) {
      setWinnerDataFromLogs({
        user: "",
        correct: false,
      });
      reset();
    }
  }, [data, error]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="answer"
          className="block text-sm font-medium text-gray-700"
        >
          Your Answer
        </label>
        <input
          id="answer"
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <button
        type="submit"
        disabled={
          winnerDataFromLogs.correct || (data && data !== ZeroAddress)
            ? true
            : !writeContract || isPending || txLoading
        }
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
      >
        {isPending || txLoading
          ? "Submitting..."
          : winnerDataFromLogs.correct || (data && data !== ZeroAddress)
          ? "We have a winner! Waiting for new riddle..."
          : submitted && txSuccess
          ? "Re-submit you answer"
          : "Submit Answer"}
      </button>

      {winnerDataFromLogs.correct ? (
        <p className="text-green-600 font-medium">
          We have a winner!{" "}
          {address === winnerDataFromLogs.user
            ? "Congratulations! It's you."
            : `${winnerDataFromLogs.user} answered correctly.`}
        </p>
      ) : (
        submitted &&
        txSuccess && (
          <p className="text-green-600 font-medium">
            Answer submitted! Check back to see if you’ve won or retry.
          </p>
        )
      )}
    </form>
  );
}

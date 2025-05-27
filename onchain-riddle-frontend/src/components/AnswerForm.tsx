// File: frontend/src/components/AnswerForm.tsx
import { useState } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { RIDDLE_ADDRESS, RIDDLE_ABI } from "../lib/contract";

export default function AnswerForm() {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { data: hash, writeContract, isPending } = useWriteContract();

  const { isLoading: txLoading, isSuccess: txSuccess } =
    useWaitForTransactionReceipt({
      hash,
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
        disabled={!writeContract || isPending || txLoading}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
      >
        {isPending || txLoading ? "Submitting..." : "Submit Answer"}
      </button>
      {submitted && txSuccess && (
        <p className="text-green-600 font-medium">
          Answer submitted! Check back to see if you’ve won.
        </p>
      )}
    </form>
  );
}

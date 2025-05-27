// File: bot/index.ts
import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { RIDDLE_ABI, RIDDLE_CONTRACT_ADDRESS } from "./contract/index";

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

const contract = new ethers.Contract(
  RIDDLE_CONTRACT_ADDRESS,
  RIDDLE_ABI,
  wallet
);

const riddles = [
  { question: "What has keys but can't open locks?", answer: "piano" },
  {
    question:
      "What can travel around the world while staying in the same corner?",
    answer: "stamp",
  },
  { question: "What has to be broken before you can use it?", answer: "egg" },
  { question: "What has a heart that doesn't beat?", answer: "artichoke" },
  { question: "What has many teeth but can't bite?", answer: "comb" },
  { question: "What has a neck but no head?", answer: "bottle" },
  { question: "What can you catch but not throw?", answer: "cold" },
  { question: "What has one eye but can't see?", answer: "needle" },
  {
    question: "What has a thumb and four fingers but is not alive?",
    answer: "glove",
  },
  {
    question: "What begins with T, ends with T, and has T in it?",
    answer: "teapot",
  },
  {
    question: "What has a face and two hands but no arms or legs?",
    answer: "clock",
  },
  {
    question: "I add flavor to your dishes and keep your hash safe. What am I?",
    answer: "salt",
  },
];

let riddleIndex = 0;

async function postNextRiddle() {
  const r = riddles[riddleIndex % riddles.length];
  const hash = ethers.keccak256(ethers.toUtf8Bytes(r.answer));
  console.log(`Posting new riddle: ${r.question}`);
  const tx = await contract.setRiddle(r.question, hash);
  await tx.wait();
  console.log("Riddle posted!");
  riddleIndex++;
}

async function startBot() {
  try {
    await postNextRiddle();
  } catch (error: any) {
    if (error.reason !== "Riddle already active") {
      throw error;
    } else console.log(error.reason);
  }
  contract.on("Winner", async (winner) => {
    console.log(`Winner detected: ${winner}`);
    setTimeout(postNextRiddle, 10000); // Delay before new riddle
  });
  console.log("Bot is listening for winners...");
}

startBot();

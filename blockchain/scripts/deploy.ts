import { ethers } from "hardhat";

async function main() {
  const Riddle = await ethers.getContractFactory("OnchainRiddle");
  const riddle = await Riddle.deploy(); // Ethers v6: no constructor args here

  await riddle.waitForDeployment(); // <-- v6 replacement for .deployed()

  const address = await riddle.getAddress(); // <-- v6 way to get address
  console.log("OnchainRiddle deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

# 🧩 Onchain Riddle Game

This project is a submission for the Zama Engineering Challenge. It includes:
- A Solidity smart contract for managing on-chain riddles
- A React frontend using Wagmi v2 and RainbowKit for wallet interaction
- A Node.js bot that automatically updates the riddle once solved
- A full Docker Compose setup to run everything with a single command

---

## 📦 Project Structure

```
/docker-compose.yaml          # to run the project locally using `docker-compose up`
├── onchain-riddle-bot/       # Node.js bot
│   ├── index.ts
│   ├── contract/
|   │   └── index.ts          # Contains contract address and ABI
│   ├── Dockerfile       
│   └── tsconfig.json
├── onchain-riddle-frontend/  # React + Wagmi frontend
|   ├── src/
│   ├── public/
│   └── Dockerfile
├── blockchain/              # Solidity contract
│   └── contracts/
|       └── OnchainRiddle.sol 
├── docker-compose.yml
└── README.md
```

---

## 🚀 Getting Started Locally

### Prerequisites

- Node.js v18+
- Docker + Docker Compose
- A Sepolia wallet + Infura/Alchemy URL

### Setup Environment

Create a `.env` file in the project root:

```env
PRIVATE_KEY=your_private_key_here
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/your_project_id
```

### Run Everything with Docker Compose

```bash
docker compose up
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Bot will auto-run in background

---

## 🧠 Frontend

### Manual Dev Run

```bash
cd onchain-riddle-frontend
npm install
npm run start
```

Runs at: `http://localhost:3000` (or as configured)

Live app deployed on: [https://zama-challenge-production.up.railway.app/](https://zama-challenge-production.up.railway.app/)

---

## 🤖 Bot

### Manual Dev Run

add `.env` inside the `onchain-riddle-bot/`
```bash
cd bot
npm install
npm run dev
```

### Production Build

```bash
npm run build     # Compiles to JS
npm run start     # Runs built JS
```

---

## 🔐 Smart Contract

- Contract: [`OnchainRiddle.sol`](./contracts/OnchainRiddle.sol)
- Network: Deployed on Sepolia - Contract address: [**0x31b392B7ADD35B94D889cadAEDb4A860eff2C76e**](https://sepolia.etherscan.io/address/0x31b392B7ADD35B94D889cadAEDb4A860eff2C76e)
- Events: `RiddleSet`, `AnswerAttempt`, `Winner`
- Use Hardhat for deployment, `npx hardhat run scripts/deploy.ts --network sepolia`

---

## 🐳 Docker Compose Overview

```yaml
services:
  frontend:
    build: ./onchain-riddle-frontend
    ports:
      - "3000:80"
  bot:
    build: ./bot
    environment:
      - PRIVATE_KEY
      - SEPOLIA_RPC_URL
```

---

## 📄 Report

See [zama-final-report.pdf](./zama-final-report.pdf) for the full write-up and architectural overview.

---

## ✅ Done

This system is modular, easily deployable via Railway, and demonstrates real-time on-chain interactivity with automated state updates.

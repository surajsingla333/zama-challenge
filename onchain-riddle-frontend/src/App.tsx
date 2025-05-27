// File: frontend/src/App.tsx
import "./App.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { config } from "./lib/wagmi";
import RiddleDisplay from "./components/RiddleDisplay";
import AnswerForm from "./components/AnswerForm";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="max-w-xl w-full bg-white shadow-lg rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800">
                  🔐 Onchain Riddle
                </h1>
                <ConnectButton />
              </div>
              <RiddleDisplay />
              <AnswerForm />
            </div>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;

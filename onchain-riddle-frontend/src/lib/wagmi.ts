import { http, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";

const { connectors } = getDefaultWallets({
  projectId: "0e1a80fa03b5d05d5dc3443db1200e8a",
  appName: "Onchain Riddle",
});

export const config = createConfig({
  connectors,
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
  ssr: true, // optional for SSR apps

//   autoConnect: false, // ✅ disable auto-connect
});

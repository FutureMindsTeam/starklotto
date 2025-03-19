import React, { useEffect, useMemo, useState } from "react";
import { Connector } from "@starknet-react/core";
import Image from "next/image";
import { useTheme } from "next-themes";

const Wallet = ({
  handleConnectWallet,
  connector,
  loader,
}: {
  connector: Connector;
  loader: ({ src }: { src: string }) => string;
  handleConnectWallet: (
    e: React.MouseEvent<HTMLButtonElement>,
    connector: Connector,
  ) => void;
}) => {
  const [clicked, setClicked] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  // connector has two : dark and light icon
  const icon = useMemo(() => {
    return typeof connector.icon === "object"
      ? resolvedTheme === "dark"
        ? (connector.icon.dark as string)
        : (connector.icon.light as string)
      : (connector.icon as string);
  }, [connector, resolvedTheme]);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? (
    <button
      className={`flex items-center gap-4 w-full p-4 rounded-xl transition-all duration-200 hover:bg-[#1d3a6d]/30 bg-[#1d3a6d]/10 border border-[#1d3a6d] text-[#00FFA3] ${
        clicked ? "bg-[#1d3a6d]/40" : ""
      }`}
      onClick={(e) => {
        setClicked(true);
        handleConnectWallet(e, connector);
      }}
    >
      <div className="h-8 w-8 rounded-lg overflow-hidden flex items-center justify-center bg-[#1d3a6d]/30">
        <Image
          alt={connector.name}
          loader={loader}
          src={icon}
          width={70}
          height={70}
          className="h-6 w-6 object-contain"
        />
      </div>
      <span className="flex-1 text-left font-medium">{connector.name}</span>
    </button>
  ) : null;
};

export default Wallet;

"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";
import { StarknetConfig, starkscan } from "@starknet-react/core";
import { Header } from "~~/components/Header";
import { Footer } from "~~/components/Footer";
import { ProgressBar } from "~~/components/scaffold-stark/ProgressBar";
import { appChains, connectors } from "~~/services/web3/connectors";
import provider from "~~/services/web3/provider";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-stark/useNativeCurrencyPrice";

const ScaffoldStarkApp = ({ children }: { children: React.ReactNode }) => {
  useNativeCurrencyPrice();
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  return (
    <>
      <div className="flex relative flex-col min-h-screen ">
        {isDarkMode ? (
          <>
            <div className="md:block hidden circle-gradient-dark w-[330px] h-[330px]"></div>
            <div className="md:block hidden circle-gradient-blue-dark w-[330px] h-[330px]"></div>
          </>
        ) : (
          <>
            <div className="md:block hidden circle-gradient w-[330px] h-[330px]"></div>
            <div className="md:block hidden circle-gradient-blue w-[330px] h-[630px]"></div>
          </>
        )}
        <Header />
        <main className="relative flex flex-col flex-1">{children}</main>
        {/*         <Footer /> */}
      </div>
      <Toaster />
    </>
  );
};

export const ScaffoldStarkAppWithProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <StarknetConfig
      chains={appChains}
      provider={provider}
      connectors={connectors}
      explorer={starkscan}
    >
      <ProgressBar />
      <ScaffoldStarkApp>{children}</ScaffoldStarkApp>
    </StarknetConfig>
  );
};

"use client";

// @refresh reset
import { Balance } from "../Balance";
import { AddressInfoDropdown } from "./AddressInfoDropdown";
import { AddressQRCodeModal } from "./AddressQRCodeModal";
import { WrongNetworkDropdown } from "./WrongNetworkDropdown";
import { useAutoConnect, useNetworkColor } from "~~/hooks/scaffold-stark";
import { useTargetNetwork } from "~~/hooks/scaffold-stark/useTargetNetwork";
import { getBlockExplorerAddressLink } from "~~/utils/scaffold-stark";
import { useAccount, useNetwork } from "@starknet-react/core";
import { Address } from "@starknet-react/chains";
import { useEffect, useMemo, useState } from "react";
import ConnectModal from "./ConnectModal";
import scaffoldConfig from "~~/scaffold.config";

interface CustomConnectButtonProps {
  isHeader?: boolean;
}

/**
 * Custom Connect Button (watch balance + custom design)
 */
export const CustomConnectButton: React.FC<CustomConnectButtonProps> = ({
  isHeader = false,
}) => {
  useAutoConnect();
  const networkColor = useNetworkColor();
  const { targetNetwork } = useTargetNetwork();
  const { account, status, address: accountAddress } = useAccount();
  const [accountChainId, setAccountChainId] = useState<bigint>(0n);
  const { chain } = useNetwork();

  const blockExplorerAddressLink = useMemo(() => {
    return (
      accountAddress &&
      getBlockExplorerAddressLink(targetNetwork, accountAddress)
    );
  }, [accountAddress, targetNetwork]);

  // effect to get chain id and address from account
  useEffect(() => {
    if (account) {
      const getChainId = async () => {
        const chainId = await account.channel.getChainId();
        setAccountChainId(BigInt(chainId as string));
      };

      getChainId();
    }
  }, [account]);

  if (status === "disconnected") return <ConnectModal isHeader={isHeader} />;

  if (accountChainId !== targetNetwork.id) {
    return <WrongNetworkDropdown />;
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-2 bg-[#0B1221] border border-[#1d3a6d] rounded-xl">
          <Balance
            address={accountAddress as Address}
            className="min-h-0 h-auto text-[#00FFA3]"
          />
          <span className="text-xs text-[#00FFA3]">
            {chain.name}
          </span>
        </div>
        <AddressInfoDropdown
          address={accountAddress as Address}
          displayName={""}
          ensAvatar={""}
          blockExplorerAddressLink={blockExplorerAddressLink}
        />
        <AddressQRCodeModal
          address={accountAddress as Address}
          modalId="qrcode-modal"
        />
      </div>
    </>
  );
};

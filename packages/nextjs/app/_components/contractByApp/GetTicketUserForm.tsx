"use client";

import { useState, useEffect } from "react";
import { Address } from "@starknet-react/chains";
import { Abi } from "abi-wan-kanabi";
import {
  getArgsAsStringInputFromForm,
  decodeContractResponse,
} from "~~/app/_components/contractByApp";
import { AbiFunction } from "~~/utils/scaffold-stark/contract";
import { BlockNumber } from "starknet";
import { useContract, useReadContract } from "@starknet-react/core";
import { GetTicketInfoForm } from "./GetTicketInfoForm";
import Link from "next/link";

type GetTicketUserFormProps = {
  loteryId: number;
  userAddress: Address;
  contractAddress: Address;
  getUserTickets: AbiFunction;
  abi: Abi;
  getTicketInfo: AbiFunction;
};

export const GetTicketUserForm = ({
  loteryId = 2,
  userAddress,
  contractAddress,
  getUserTickets,
  abi,
  getTicketInfo,
}: GetTicketUserFormProps) => {
  const [inputValue, setInputValue] = useState<any | undefined>(undefined);
  const [ticketsId, setTicketsId] = useState<string[]>([]);
  const [selectedTicketId, setSelectedTicketId] = useState<string>("");

  const { contract: contractInstance } = useContract({
    abi,
    address: contractAddress,
  });

  const { isFetching, data, refetch, error } = useReadContract({
    address: contractAddress,
    functionName: getUserTickets.name,
    abi: [...abi],
    args: inputValue || [],
    enabled: !!inputValue && !!contractInstance,
    blockIdentifier: "pending" as BlockNumber,
  });

  useEffect(() => {
    if (error) {
      console.error(error?.message);
      console.error(error.stack);
    }
  }, [error]);

  const handleRead = () => {
    const newInputValue = getArgsAsStringInputFromForm({
      "GetUserTickets_drawId_core::integer::u64": loteryId,
      "GetUserTickets_player_core::starknet::contract_address::ContractAddress":
        userAddress,
    });
    setInputValue(newInputValue);
    refetch();
  };

  useEffect(() => {
    if (data && abi && getUserTickets) {
      setTicketsId(
        JSON.parse(
          decodeContractResponse({
            resp: data,
            abi,
            functionOutputs: getUserTickets?.outputs,
            asText: true,
          }),
        ),
      );
    }
  }, [data, abi, getUserTickets]);

  return (
    <div className="flex flex-col gap-3 first:pt-0 last:pb-1">
      <div className="flex justify-between gap-2 flex-wrap">
        <div className={`flex justify-center w-full`}>
          <button
            disabled={isFetching}
            onClick={handleRead}
            className={`mt-2 px-6 py-3 ${
              !isFetching
                ? "bg-green-500 hover:bg-green-600 animate-bounce"
                : "bg-gray-500 cursor-not-allowed"
            } text-white -semibold rounded-full shadow-lg transition`}
          >
            {isFetching && (
              <span className="loading loading-spinner loading-xs"></span>
            )}
            Consult Tickets
          </button>
        </div>
      </div>

      {data !== null && data !== undefined && (
        <>
          <h1 className="text-center text-2xl -bold">
            Tickets Found: {ticketsId.length}
          </h1>
          {ticketsId.length > 0 ? (
            <>
              <p className="text-center text-lg font-bold">Search Ticket</p>
              <select
                value={selectedTicketId}
                onChange={(e) => setSelectedTicketId(e.target.value)}
                className="border border-gray-300 rounded-md p-2 mb-4 bg-white text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a ticket</option>
                {ticketsId.length > 0 ? (
                  ticketsId.map((ticketId, index) => (
                    <option
                      key={ticketId}
                      value={ticketId}
                    >{`Ticket ${index + 1}`}</option>
                  ))
                ) : (
                  <option value="">No tickets found</option>
                )}
              </select>

              <GetTicketInfoForm
                loteryId={2}
                userAddress={userAddress}
                selectedTicketId={selectedTicketId || ""}
                contractAddress={contractAddress}
                abiFunction={getTicketInfo}
                abi={abi}
              />
            </>
          ) : (
            <div className="flex justify-center">
              <Link
                href="/play"
                className="text-center text-lg font-bold bg-yellow-500 hover:bg-yellow-600 animate-bounce px-6 py-3 rounded-full shadow-lg transition"
              >
                Get Tickets First!
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

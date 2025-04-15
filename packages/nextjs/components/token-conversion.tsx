"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ArrowDown, Info, Settings, RotateCw, ArrowUpDown } from "lucide-react";
import Image from "next/image";
import { Tooltip } from "./ui/tooltip";
import { Toast } from "./ui/toast";

// Mock data - would be replaced with actual API calls
const mockUserBalance = 2.7033;
const mockTarkPlayBalance = 5.4066;

interface TokenConversionProps {
  onSuccess?: (amount: number, receivedAmount: number, message: string) => void;
  onError?: (error: string) => void;
  useExternalNotifications?: boolean;
}

export default function TokenConversion({
  onSuccess,
  onError,
  useExternalNotifications = false,
}: TokenConversionProps) {
  const [inputAmount, setInputAmount] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    visible: boolean;
    title: string;
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [conversionDirection, setConversionDirection] = useState<
    "strkToTarkPlay" | "tarkPlayToStrk"
  >("strkToTarkPlay");

  // Conversion parameters
  const conversionRate = 1; // 1:1 conversion rate
  const feePercentage = 0.5; // 0.5% fee

  // Calculated values
  const numericAmount = Number.parseFloat(inputAmount) || 0;
  const feeAmount = numericAmount * (feePercentage / 100);

  // Calculate received amount based on direction
  const receivedAmount =
    conversionDirection === "strkToTarkPlay"
      ? numericAmount * conversionRate - feeAmount
      : (numericAmount + feeAmount) / conversionRate;

  // Input validation based on direction
  const isValidInput =
    numericAmount > 0 &&
    !isNaN(numericAmount) &&
    (conversionDirection === "strkToTarkPlay"
      ? numericAmount <= mockUserBalance
      : numericAmount <= mockTarkPlayBalance);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Only allow numbers and decimal point
    if (value === "" || /^\d*\.?\d{0,4}$/.test(value)) {
      setInputAmount(value);
      setError(null);
    }
  };

  // Handle max button click
  const handleMaxClick = () => {
    setInputAmount(
      conversionDirection === "strkToTarkPlay"
        ? mockUserBalance.toString()
        : mockTarkPlayBalance.toString(),
    );
    setError(null);
  };

  // Toggle conversion direction
  const toggleConversionDirection = () => {
    setConversionDirection((prev) =>
      prev === "strkToTarkPlay" ? "tarkPlayToStrk" : "strkToTarkPlay",
    );
    setInputAmount("");
    setError(null);
  };

  // Show toast notification
  const showToast = (
    title: string,
    message: string,
    type: "success" | "error",
  ) => {
    if (!useExternalNotifications) {
      setToast({
        visible: true,
        title,
        message,
        type,
      });
    }
  };

  // Handle conversion
  const handleConvert = async () => {
    if (!isValidInput) {
      if (numericAmount <= 0) {
        setError("Please enter an amount greater than 0");
      } else if (
        (conversionDirection === "strkToTarkPlay" &&
          numericAmount > mockUserBalance) ||
        (conversionDirection === "tarkPlayToStrk" &&
          numericAmount > mockTarkPlayBalance)
      ) {
        setError("Insufficient balance");
      }
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const successMessage =
        conversionDirection === "strkToTarkPlay"
          ? `Successfully converted ${numericAmount.toFixed(4)} STRK to ${receivedAmount.toFixed(4)} $tarkPlay`
          : `Successfully converted ${numericAmount.toFixed(4)} $tarkPlay to ${receivedAmount.toFixed(4)} STRK`;

      showToast("Conversion Successful", successMessage, "success");

      if (onSuccess) {
        onSuccess(numericAmount, receivedAmount, successMessage);
      }

      // Reset form
      setInputAmount("");
    } catch (err) {
      const errorMessage = "Failed to convert tokens. Please try again.";
      setError(errorMessage);

      if (onError) {
        onError(errorMessage);
      }

      showToast("Conversion Failed", errorMessage, "error");
    } finally {
      setIsProcessing(false);
    }
  };

  const getTokenInfo = (isSource: boolean) => {
    const isStrkToken = isSource
      ? conversionDirection === "strkToTarkPlay"
      : conversionDirection === "tarkPlayToStrk";

    return {
      name: isStrkToken ? "STRK" : "$tarkPlay",
      symbol: isStrkToken ? "STRK" : "$TP",
      balance: isStrkToken ? mockUserBalance : mockTarkPlayBalance,
      icon: isStrkToken ? (
        <Image
          src="/strk-svg.svg"
          alt="STRK Token"
          width={20}
          height={20}
          className="w-5 h-5"
        />
      ) : (
        <span className="text-purple-400 text-xs font-bold">$TP</span>
      ),
    };
  };

  const sourceToken = getTokenInfo(true);
  const destinationToken = getTokenInfo(false);

  return (
    <div className="w-full max-w-md mx-auto">
      {toast?.visible &&
        typeof window !== "undefined" &&
        createPortal(
          <Toast
            title={toast.title}
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />,
          document.body,
        )}

      <div className="bg-gray-900 text-white rounded-xl shadow-lg overflow-hidden border border-purple-500/20">
        <div className="flex items-center justify-between p-4 border-b border-purple-500/30">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
            Swap
          </h2>
          <button className="p-2 rounded-full hover:bg-purple-500/10 transition-colors">
            <Settings size={24} className="text-purple-400" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="rounded-lg bg-gray-800 p-4 border border-purple-500/20">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center p-0.5">
                  <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                    {sourceToken.icon}
                  </div>
                </div>
                <span className="font-semibold">{sourceToken.name}</span>
              </div>
              <input
                type="text"
                value={inputAmount}
                onChange={handleInputChange}
                className="bg-transparent border-none text-right text-xl font-medium w-[60%] focus:outline-none"
                placeholder="0.0"
              />
            </div>

            <div className="flex items-center justify-between text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <span>Balance: {sourceToken.balance}</span>
                <button
                  className="h-6 px-2 py-0 text-xs bg-purple-500/20 hover:bg-purple-500/30 rounded-md transition-colors text-purple-300"
                  onClick={handleMaxClick}
                >
                  MAX
                </button>
              </div>
              <span>${(numericAmount * 0.19).toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-center -my-2">
            <button
              onClick={toggleConversionDirection}
              className="bg-purple-500/20 p-2 rounded-full hover:bg-purple-500/30 transition-colors"
            >
              <ArrowUpDown size={24} className="text-purple-400" />
            </button>
          </div>

          <div className="rounded-lg bg-gray-800 p-4 border border-purple-500/20">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center p-0.5">
                  <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                    {destinationToken.icon}
                  </div>
                </div>
                <span className="font-semibold">{destinationToken.name}</span>
              </div>
              <div className="text-right text-xl font-medium">
                {isValidInput ? receivedAmount.toFixed(6) : "0.0"}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-300">
              <span>Balance: {destinationToken.balance}</span>
              <span>${(receivedAmount * 0.19).toFixed(2)}</span>
            </div>
          </div>

          <div className="rounded-lg bg-gray-800 p-4 space-y-2 border border-purple-500/20">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Image
                  src="/strk-svg.svg"
                  alt="STRK Token"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                <span>1 STRK = 1 $tarkPlay</span>
              </div>
              <button className="h-6 w-6 p-0 hover:bg-purple-500/20 rounded-full transition-colors">
                <RotateCw
                  className="rotate-[135deg] text-purple-400"
                  size={24}
                />
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <span>Fee (0.5%)</span>
                <Tooltip content="A 0.5% fee is applied to all conversions">
                  <Info size={20} className="text-purple-400" />
                </Tooltip>
              </div>
              <span>{isValidInput ? feeAmount.toFixed(6) : "0.0"}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <span>You will receive</span>
              </div>
              <span className="font-medium text-purple-300">
                {isValidInput ? receivedAmount.toFixed(6) : "0.0"}{" "}
                {destinationToken.name}
              </span>
            </div>
          </div>

          {error && <div className="text-red-400 text-sm px-1">{error}</div>}
        </div>

        <div className="p-4">
          <button
            className={`w-full py-6 text-lg font-medium rounded-lg transition-colors ${
              isValidInput
                ? "bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!isValidInput || isProcessing}
            onClick={handleConvert}
          >
            {isProcessing ? "Processing..." : "Swap"}
          </button>
        </div>
      </div>
    </div>
  );
}

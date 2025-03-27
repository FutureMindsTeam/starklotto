import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  numTickets: number;
  tickets: Array<number[]>;
  totalPrice: number;
  currentBalance: number;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  numTickets,
  tickets,
  totalPrice,
  currentBalance,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const balanceAfterPurchase = currentBalance - totalPrice;

  return (
    <div className="fixed inset-0 z-50">
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <motion.div
                className="bg-[#191c2a] rounded-xl border border-white/10 max-w-md w-full overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-5 text-white">
                  <div className="flex justify-between items-center mb-5">
                    <h2 className="text-xl font-bold">Confirm Purchase</h2>
                    <button
                      onClick={onClose}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-white">Number of tickets:</span>
                      <span className="font-bold text-white">{numTickets}</span>
                    </div>

                    {tickets.map((ticketNumbers, index) => {
                      const ticketId = index + 1;
                      return (
                        <div
                          key={ticketId}
                          className="flex flex-col mb-3 last:mb-0"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300 text-sm mr-2">
                              Ticket #{ticketId}:
                            </span>
                            <div className="flex flex-row gap-1.5">
                              {ticketNumbers
                                .sort((a, b) => a - b)
                                .map((num) => (
                                  <div
                                    key={`${ticketId}-${num}`}
                                    className="h-9 w-9 rounded-full bg-gradient-to-br text-black from-amber-400 to-amber-600 flex items-center justify-center font-bold text-sm"
                                  >
                                    {num}
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <div className="border-t border-white/10 my-4 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white">Total payment:</span>
                        <span className="font-bold text-green-400">
                          ${totalPrice} $tarkPlay
                        </span>
                      </div>

                      <div className="flex justify-between items-center mt-1">
                        <span className="text-white">Current balance:</span>
                        <span className="text-white">
                          ${currentBalance} $tarkPlay
                        </span>
                      </div>

                      <div className="flex justify-between items-center mt-1">
                        <span className="text-white">
                          Balance after purchase:
                        </span>
                        <span className="text-white">
                          ${balanceAfterPurchase} $tarkPlay
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button
                      variant="outline"
                      className="flex-1 border-white/10 hover:bg-white/5"
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={onConfirm}
                    >
                      <Check className="w-4 h-4 mr-2" /> Confirm Purchase
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

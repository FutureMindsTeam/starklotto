import React from "react";
import { useSweepstakesStore } from "~~/services/store/sweepstakesStore";
import { Button } from "../ui/button";
import { SweepstakesEntry } from "~~/services/store/sweepstakesStore";

export default function ContentDisplay() {
  const { sweepstakes, deleteSweepstakes, startEditing, openModal } =
    useSweepstakesStore();

  const handleEdit = (item: SweepstakesEntry) => {
    startEditing(item.id);
    openModal();
  };

  if (!sweepstakes.length) {
    return (
      <div className="w-full flex justify-center items-center h-40 text-gray-500">
        No sweepstakes available. Add some!
      </div>
    );
  }

  return (
    <div className="w-full flex flex-wrap justify-center gap-4">
      {sweepstakes.map((item) => (
        <div
          key={item.id}
          role="contentinfo"
          className="basis-80 grow-0 flex flex-col bg-black/20 shadow-md border border-accent rounded-lg p-6 relative space-y-2"
        >
          <div className="space-y-1">
            {Object.entries(item)
              .filter(([key]) =>
                [
                  "startDate",
                  "endDate",
                  "drawDate",
                  "ticketPrice",
                  "mainPrize",
                  "secondaryPrize",
                  "protocolFee",
                ].includes(key),
              )
              .map(([key, value]) => (
                <p key={key} className="text-base text-white">
                  <span className="font-semibold">
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </span>{" "}
                  {typeof value === "number"
                    ? key.includes("Price")
                      ? `$${value}`
                      : `${value}%`
                    : value}
                </p>
              ))}
          </div>

          <div className="mt-auto flex space-x-2">
            <Button
              size="sm"
              variant="default"
              onClick={() => handleEdit(item)}
              className="px-8 w-full"
            >
              Edit
            </Button>

            <Button
              size="sm"
              variant="destructive"
              onClick={() => deleteSweepstakes(item.id)}
              className="w-full"
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

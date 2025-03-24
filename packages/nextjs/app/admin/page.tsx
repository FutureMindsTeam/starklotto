"use client";

import { Button } from "~~/components/ui/button";
import SweepstakesModal from "~~/components/sweepstakes";
import { useSweepstakesStore } from "~~/services/store/sweepstakesStore";

export default function AdminPage() {
  const { openModal } = useSweepstakesStore();

  return (
    <div>
      <h2 className="text-3xl font-semibold">Admin Page</h2>
      <Button onClick={openModal}>Set Draw Parameters</Button>
      <SweepstakesModal modalId="sweepstakesModal" />
    </div>
  );
}
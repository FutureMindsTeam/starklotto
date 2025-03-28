"use client";

import { Button } from "~~/components/ui/button";
import SweepstakesModal from "~~/components/sweepstakes";
import { useSweepstakesStore } from "~~/services/store/sweepstakesStore";
import ContentDisplay from "~~/components/sweepstakes/ContentDisplay";
import React from "react";
import StatisticsCard from "./statisticsCard";
import { BarChart } from "lucide-react";

export default function AdminPage() {
  const { openModal } = useSweepstakesStore();

  return (
    <div>
      
      <h2 className="text-3xl font-bold">Administration Panel</h2>
      <h4 className="text-gray-400">Welcome to the StarkLotto administration panel</h4>
      <Button onClick={openModal}>Set Draw Parameters</Button>
      <ContentDisplay />
      <SweepstakesModal modalId="sweepstakesModal" />

      {/* Grid de tarjetas (invoca a los archivos de las tarjetas) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
       <StatisticsCard />
       
      </div>

    </div>
  );
}
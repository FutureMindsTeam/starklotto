"use client";

import { Button } from "~~/components/ui/button";
import SweepstakesModal from "~~/components/sweepstakes";
import { useSweepstakesStore } from "~~/services/store/sweepstakesStore";
import ContentDisplay from "~~/components/sweepstakes/ContentDisplay";
import React from "react";
import StatisticsCard from "./statisticsCard";
import Header from "~~/components/admin/Header";
import SettingsCard from "~~/components/admin-panel/SettingsCard";

export default function AdminPage() {
  const { openModal } = useSweepstakesStore();

  return (
    <div>
      <Header />
      <h2 className="text-3xl font-semibold">Admin Page</h2>
      <Button onClick={openModal}>Set Draw Parameters</Button>
      <ContentDisplay />
      <SettingsCard />
      <SweepstakesModal modalId="sweepstakesModal" />

      {/* Grid de tarjetas (llama las tarjetas) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <StatisticsCard />
      </div>
    </div>
  );
}

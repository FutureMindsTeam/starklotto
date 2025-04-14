"use client";

import React from "react";
import Link from "next/link";
import { Button } from "~~/components/ui/button";
import { BarChart3, ArrowRight } from "lucide-react";

const StatisticsCard: React.FC = () => {
  return (
    <div className="bg-[#151515] border border-white/5 rounded-lg shadow-md p-6 flex flex-col justify-between">
      <div className="flex flex-col items-center text-center">
        <div className="h-12 w-12 rounded-full bg-green-700 flex items-center justify-center mb-4">
          <BarChart3 className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-xl font-semibold mb-0">Statistics</h2>
        <p className="text-gray-400 mb-4">View system metrics</p>
      </div>

      {/* Cambiar el # por la direccion del archivo que quieren visualizar */}
      <Link href="#">
        <Button className="w-full">
          View Statistics
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>

      {/* Fin div principal */}
    </div>
  );
};
// Permite importar en otras partes del proyecto
export default StatisticsCard;

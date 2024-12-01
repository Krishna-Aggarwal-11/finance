"use client";

import { DataGrid } from "@/components/data-grid";
import { DataCharts } from "@/components/data-charts";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Suspense>
        <DataGrid />
      </Suspense>
      <Suspense>
        <DataCharts />
      </Suspense>
    </div>
  );
}

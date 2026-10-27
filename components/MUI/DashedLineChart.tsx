
"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";

type ChartItem = {
  tanggal: string;
  pemasukan: number;
  pengeluaran: number;
};

type ApiResponse = {
  success: boolean;
  message?: string;
  data: ChartItem[];
};

const formatRupiah = (value: number) =>
  `Rp ${new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 0,
  }).format(value)}`;

export default function DashedLineChart() {
  const [chartData, setChartData] = useState<ChartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchChart() {
      try {
        const response = await fetch("/api/chartmonth", {
          cache: "no-store",
        });

        const result: ApiResponse = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Gagal mengambil data chart");
        }

        setChartData(result.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Terjadi kesalahan"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchChart();
  }, []);

  if (loading) return <p>Memuat grafik...</p>;
  if (error) return <p>{error}</p>;

  const uData = chartData.map((item) => item.pemasukan);
  const pData = chartData.map((item) => -item.pengeluaran);
  const xLabels = chartData.map((item) => item.tanggal);

  const maxValue = Math.max(0, ...uData, ...pData.map(Math.abs));
  const yLimit = Math.max(
    1000000,
    Math.ceil(maxValue / 250000) * 250000
  );

  return (
    <Box
      sx={{
        width: "100%",
        height: 300,
        // backgroundColor: "#FFFFFF",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <BarChart
        height={300}
        borderRadius={4}
        margin={{
          top: 15,
          right: 20,
          bottom: 30,
          left: 8,
        }}
        series={[
          {
            data: uData,
            label: "Pemasukan",
            id: "income",
            color: "#1976D2",
            valueFormatter: (value) =>
              formatRupiah(value ?? 0),
          },
          {
            data: pData,
            label: "Pengeluaran",
            id: "expense",
            color: "#EF4444",
            
            valueFormatter: (value) =>
              formatRupiah(value ?? 0),
          },
        ]}
        xAxis={[
          {
            scaleType: "band",
            data: xLabels,
            tickLabelInterval: (_value, index) =>
              index % 5 === 0 ||
              index === xLabels.length - 1,
            tickLabelStyle: {
              fontSize: 11,
              fill: "var(--chart-text)",
            },
          },
        ]}
        yAxis={[
          {
            min: -yLimit,
            max: yLimit,
            tickNumber: 5,
            width: 92,
            valueFormatter: (value: number) => formatRupiah(value),
            tickLabelStyle: {
              fontSize: 11,
              fill: "var(--chart-text)",
            },
          },
        ]}
        grid={{
          horizontal: true,
          vertical: true,
        }}
        sx={{
          "& .MuiChartsGrid-line": {
            stroke: "var(--chart-grid)",
            strokeOpacity: 0.85,
          },

          "& .MuiChartsAxis-line": {
            stroke: "var(--chart-grid)",
          },

          "& .MuiChartsLegend-label": {
            color: "var(--chart-text)",
          },

          "& .MuiChartsAxis-tick": {
            stroke: "transparent",
          },
        }}
      />
    </Box>
  );
}

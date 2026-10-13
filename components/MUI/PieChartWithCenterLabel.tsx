"use client"
import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

const data = [
  { value: 5, label: 'untuk makan 10% Rp.400,000' },
  { value: 10, label: 'untuk Minum 50% Rp.100,000' },
  { value: 15, label: 'Transportasi 10% Rp.500,000' },
  { value: 20, label: 'Nongkrong 20% Rp.10,000' },
];

const size = {
  width: 200,
  height: 200,
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function PieChartWithCenterLabel() {
  return (
    <PieChart series={[{ data, innerRadius: 70 }]} {...size}>
      <PieCenterLabel>Rp. 1,200,000</PieCenterLabel>
    </PieChart>
  );
}

"use client"
import Box from '@mui/material/Box';
import { LineChart, lineClasses } from '@mui/x-charts/LineChart';

const margin = { right: 24 };
const uData = [35000,15000,20000,30000,12000,17000,20000];
// const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  '1 Okt',
  '2 Okt',
  '3 Okt',
  '4 Okt',
  '5 Okt',
  '6 Okt',
  '7 Okt',
];

export default function DashedLineChart() {
  return (
    <Box sx={{ width: '100%', height: 300 }}>
      <LineChart
        series={[
          // { data: pData, label: 'pv', id: 'pvId', showMark: true },
          { data: uData, label: 'uv', id: 'uvId', showMark: true },
        ]}
        xAxis={[{ scaleType: 'point', data: xLabels, height: 28 }]}
        yAxis={[{ width: 50 }]}
        sx={{
          [`.${lineClasses.line}, .${lineClasses.mark}`]: {
            strokeWidth: 1,
          },
          [`.${lineClasses.line}[data-series="pvId"]`]: {
            strokeDasharray: '5 5',
          },
          [`.${lineClasses.line}[data-series="uvId"]`]: {
            strokeDasharray: '3 4 5 2',
          },
          [`.${lineClasses.mark}:not([data-highlighted="true"])`]: {
            fill: '#fff',
          },
          [`& [data-highlighted="true"]`]: {
            stroke: 'none',
          },
        }}
        margin={margin}
      />
    </Box>
  );
}

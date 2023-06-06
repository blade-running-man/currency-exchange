import React from 'react';
import ReactECharts from 'echarts-for-react';

interface LineChartProps {
  xAxisData: string[];
  seriesData: number[];
}

function LineChart({ xAxisData, seriesData }: LineChartProps) {
  const option = {
    tooltip: {
      trigger: 'axis',
    },

    xAxis: {
      data: xAxisData,
    },
    yAxis: {},
    series: [
      {
        type: 'line',
        data: seriesData,
      },
    ],
  };

  return <ReactECharts option={option} />;
}

export default LineChart;

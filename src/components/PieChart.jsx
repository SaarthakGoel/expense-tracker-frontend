import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const PieChart = ({ data }) => {
  const chartData = {
    labels: ['Total Debt', 'Total Lended'],
    datasets: [
      {
        data: [data.TotalDebt, data.TotalLended],
        backgroundColor: ['rgba(220, 220, 187, 0.8)', 'rgba(82, 108, 91, 0.8)'],
        borderColor: ['rgba(220, 220, 187, 1)', 'rgba(82, 108, 91, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default PieChart;
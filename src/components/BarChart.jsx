import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data }) => {
  const chartData = {
    labels: ['Total Investment', 'Current Value', 'Returns'],
    datasets: [
      {
        label: 'Investment Data',
        data: [data.TotalInvestment, data.TotalCurrent, data.TotalCurrent - data.TotalInvestment],
        backgroundColor: [
          'rgba(29, 62, 49, 0.8)',
          'rgba(82, 108, 91, 0.8)',
          'rgba(220, 220, 187, 0.8)',
        ],
        borderColor: [
          'rgba(29, 62, 49, 1)',
          'rgba(82, 108, 91, 1)',
          'rgba(220, 220, 187, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales : {
      x : {
        grid : {
          display : false,
        }
      },
      y : {
        grid : {
          display : false,
        }
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
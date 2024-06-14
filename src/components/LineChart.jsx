import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler, // Import the Filler plugin
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler // Register the Filler plugin
);

const LineChart = ({ data }) => {
  const chartData = {
    labels: ['Two Months Ago', 'Last Month', 'Current Month'],
    datasets: [
      {
        label: 'Expenses',
        data: [data.twoMonthsAgo, data.lastMonth, data.currentMonth],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
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

  return <Line data={chartData} options={options} />;
};

export default LineChart;
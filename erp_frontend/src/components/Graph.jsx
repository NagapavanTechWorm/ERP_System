import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        // This more specific font property overrides the global property
        font: {
            size: 16
        }
    }
    },
    title: {
      display: true,
      text: 'Daily Attendance Report',
      font: {weight:'bold'}
    },
  },
};

const labels = ["Present", "Absent", "Leaves Granted"];

export const data = {
  labels,
  datasets: [
    {
      label: 'students',
      data: [10,30,50],
      backgroundColor: 'rgba(95, 188, 255,0.7)',
      barThickness:60
    }
  ],
};

function Graph() {
  return <div className='w-[80%] min-h-[80%] mx-auto mt-8 '>
    <Bar options={options} data={data} />
    </div>;
}

export default Graph;
'use client';

import { Bar } from 'react-chartjs-2';
import React from 'react';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { Box } from '@mui/material';

const Data = [
  {
    id: 1,
    year: 2016,
    userGain: 80000,
    userLost: 823,
  },
  {
    id: 2,
    year: 2017,
    userGain: 45677,
    userLost: 345,
  },
  {
    id: 3,
    year: 2018,
    userGain: 78888,
    userLost: 555,
  },
  {
    id: 4,
    year: 2019,
    userGain: 90000,
    userLost: 4555,
  },
  {
    id: 5,
    year: 2020,
    userGain: 4300,
    userLost: 234,
  },
];

Chart.register(CategoryScale);

interface Props {
  loggedIn: boolean;
}

export const BarChart: React.FC<Props> = ({ loggedIn }) => {
  const [chartData, setChartData] = React.useState({
    labels: Data.map((data) => data.year),
    datasets: [
      {
        label: 'Users Gained ',
        data: Data.map((data) => data.userGain),
        backgroundColor: [
          'rgba(75,192,192,1)',
          '#ecf0f1',
          '#50AF95',
          '#f3ba2f',
          '#2a71d0',
        ],
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
  });

  return (
    <Box
      sx={{
        paddingTop: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '90%',
          maxWidth: '800px',
          flexDirection: 'column',
          flexShrink: 1,
          flexGrow: 1,
        }}
      >
        <Bar
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: 'Users Gained between 2016-2020',
              },
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </Box>
  );
};

export default BarChart;

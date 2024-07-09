import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ data, width, height }) => (
   <div>
       <Line data={data} width={width} height={height} />
   </div>
);

export default LineChart;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BarChart from '../../charts/BarChart01';
import { tailwindConfig } from '../../utils/Utils';
import { toast } from 'react-toastify';

function DashboardCard04() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        fetchRevenueData();
    }, []);

    const fetchRevenueData = async () => {
      try {
          const response = await axios.get('http://localhost:8080/api/revenues');
          const { data } = response;
  
          console.log('Fetched Revenue Data:', data); 
  
          const labels = data.map(revenue => revenue.date);
          const directData = data.map(revenue => revenue.directRevenue);
          const indirectData = data.map(revenue => revenue.indirectRevenue);

          console.log(labels);
  
          setChartData({
              labels: labels,
              datasets: [
                  {
                      label: 'Profits',
                      data: directData,
                      backgroundColor: tailwindConfig().theme.colors.blue[400],
                      hoverBackgroundColor: tailwindConfig().theme.colors.blue[500],
                      barPercentage: 0.66,
                      categoryPercentage: 0.66,
                  },
                  {
                      label: 'Expenses',
                      data: indirectData,
                      backgroundColor: tailwindConfig().theme.colors.indigo[500],
                      hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
                      barPercentage: 0.66,
                      categoryPercentage: 0.66,
                  },
              ],
          });
      } catch (error) {
          console.error('Error fetching revenue data:', error);
          toast.error('Error fetching revenue data. Please try again later.');
      }
  };
  

    return (
        <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">Expenses VS Profits</h2>
            </header>
            {/* Chart built with Chart.js 3 */}
            {/* Change the height attribute to adjust the chart height */}
            {chartData && <BarChart data={chartData} width={595} height={248} />}
        </div>
    );
}

export default DashboardCard04;

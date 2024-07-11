import React, { useEffect, useState } from 'react';
import DoughnutChart from '../../charts/DoughnutChart';
import axios from 'axios';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard06() {
  const [rolePercentages, setRolePercentages] = useState([]);

  useEffect(() => {
    // Fetch data from backend endpoint
    axios.get('http://localhost:8080/api/employees/rolePercentages')
      .then(response => {
        setRolePercentages(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching role percentages:', error);
      });
  }, []);

  // Prepare chart data based on fetched role percentages
  const chartData = {
    labels: rolePercentages.map(item => item.role),
    datasets: [
      {
        label: 'Employee Roles',
        data: rolePercentages.map(item => item.percentage),
        backgroundColor: [
          tailwindConfig().theme.colors.yellow[500],
          tailwindConfig().theme.colors.blue[400],
          tailwindConfig().theme.colors.green[500],
          tailwindConfig().theme.colors.purple[500],
          tailwindConfig().theme.colors.red[500],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.yellow[600],
          tailwindConfig().theme.colors.blue[500],
          tailwindConfig().theme.colors.green[600],
          tailwindConfig().theme.colors.purple[600],
          tailwindConfig().theme.colors.red[600],
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Employee Role Distribution</h2>
      </header>
      {/* Render chart only if rolePercentages data is available */}
      {rolePercentages.length > 0 && (
        <DoughnutChart data={chartData} width={389} height={260} />
      )}
    </div>
  );
}

export default DashboardCard06;

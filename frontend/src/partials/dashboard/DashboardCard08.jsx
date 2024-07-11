import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getAccountingRecords } from '../services/AccountingService';
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard08() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchAccountingData = async () => {
            try {
                const data = await getAccountingRecords();
                const labels = data.map(record => record.periodCovered);
                const expensesData = data.map(record => record.totalExpenses);

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Total Revenue',
                            data: expensesData,
                            borderColor: tailwindConfig().theme.colors.indigo[500],
                            fill: false,
                            borderWidth: 2,
                            tension: 0,
                            pointRadius: 0,
                            pointHoverRadius: 3,
                            pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
                            pointHoverBackgroundColor: tailwindConfig().theme.colors.indigo[500],
                            pointBorderWidth: 0,
                            pointHoverBorderWidth: 0,
                            clip: 20,
                        }
                    ]
                });
            } catch (error) {
                console.error('Error fetching accounting data:', error);
            }
        };

        fetchAccountingData();
    }, []);

    return (
        <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">Accounting Overview</h2>
            </header>
            {/* Chart built with Chart.js 3 */}
            {/* Change the height attribute to adjust the chart height */}
            {chartData && <Line data={chartData} width={595} height={248} />}
        </div>
    );
}

export default DashboardCard08;
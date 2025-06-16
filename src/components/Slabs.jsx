import {
    Chart as ChartJS, CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from 'chart.js/auto'
import { Bar } from "react-chartjs-2"
import { useTax } from "../Hooks/useTax"
import { useState, useEffect } from 'react';


ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Slabs = () => {



    const { taxBreakdown } = useTax()//takes the taxBreakdown object from the custom hook
    const filteredBreakdown = taxBreakdown.filter(item => item.amount > 0);//filters the object excluding the 0 tax slab from 0-250000
    const labels = filteredBreakdown?.map(item => item.range);//creates an array with all the slab ranges ,i.e, 0-250000,250000-50000 etc.
    const values = filteredBreakdown?.map(item => item.amount);//creates an array storing the tax paid in each slab
    const rates = filteredBreakdown?.map(item => item.rate) // creates an array storing the % rate of tax paid in each slab

    //colors of the bars to be shown on the chart
    const backgroundColors = [
        'rgba(34, 197, 94, 0.6)',   // green-500
        'rgba(59, 130, 246, 0.6)',  // blue-500
        'rgba(234, 179, 8, 0.6)',   // yellow-500
        'rgba(239, 68, 68, 0.6)'    // red-500
    ];

    //data for the chart on the y-axis
    const data = {
        labels,
        datasets: [
            {
                label: '',
                data: values,
                backgroundColor: backgroundColors.slice(0, values.length),
            },
        ],
    };

    //converting strings to range
    function parseRange(rangeStr) {
        const [start, end] = rangeStr.split(' - ').map(Number);
        return end - start;
    }

    //changing themes
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains("dark"));
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        // Initial check
        setIsDark(document.documentElement.classList.contains("dark"));
        
        //cleanup to prevent memory leaks
        return () => observer.disconnect();
    }, []);


    //coloring and dimensions for the texts and hovering texts
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                titleColor: isDark ? '#f3f4f6' : '#1f2937',
                bodyColor: isDark ? '#f3f4f6' : '#1f2937',
                backgroundColor: isDark ? '#1f2937' : '#f3f4f6',
                callbacks: {
                    title: (tooltipItems) => {
                        const index = tooltipItems[0].dataIndex;
                        const item = filteredBreakdown[index];
                        const rate = rates[index]
                        return `Tax Bracket: ${rate}% Range: (${item.range})`;
                    },
                    label: (tooltipItem) => {
                        const item = filteredBreakdown[tooltipItem.dataIndex];
                        return [
                            `Tax Owed: ₹${item.amount.toLocaleString()}`,
                            `Taxable Income: ₹${(parseRange(item.range)).toLocaleString()}`
                        ];
                    },
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: isDark ? '#d1d5db' : '#1f2937', // gray-300 / gray-800
                },
                grid: {
                    color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: isDark ? '#d1d5db' : '#1f2937',
                    callback: (value) => `₹${value.toLocaleString()}`,
                },
                grid: {
                    color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                },
            },
        },
    };


    return (
        <>
            {filteredBreakdown.length > 0 ?
                <div className="flex justify-center pt-[20px] pb-[20px]">

                    <div className="shadow-[0_0px_10px_2px_rgba(0,0,0,0.1)] w-[90vw] dark:bg-gray-700 dark:text-gray-300 rounded-lg p-[40px] h-[450px] pb-[10px] pl-[40px]">
                        <div className='pb-[20px] text-gray-800 font-bold text-[150%] dark:text-gray-300'> Tax Breakdown by Bracket</div>
                        <div className="w-full max-w-full h-[350px] pb-[20px]">
                            <Bar data={data} options={options} />
                        </div>
                    </div>
                </div> :
                <div></div>}
        </>
    );
}

export default Slabs
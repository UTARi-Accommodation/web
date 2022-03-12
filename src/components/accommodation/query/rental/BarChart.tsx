import * as React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { RentalFrequencies, RentalRange } from 'utari-common';

Chart.register(
    BarElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = ({
    rentalRangeFrequencies,
    rentalSelectedRange: { min, max },
    length,
}: Readonly<{
    rentalRangeFrequencies: RentalFrequencies;
    rentalSelectedRange: RentalRange;
    length: number;
}>) => {
    const data = Array.from({ length }).flatMap((_, i) => {
        const elem = rentalRangeFrequencies[i];
        return elem ? [elem] : [];
    });

    const options = {
        type: 'bar',
        data,
        responsive: true,
        scales: {
            x: {
                // display: false,
            },
            y: {
                // display: false,
                ticks: {
                    stepSize: 1,
                },
            },
        },
        plugins: {
            legend: {
                position: 'hidden',
            },
        },
    } as const;

    const barData = {
        labels: data.map(([val]) => val),
        datasets: [
            {
                backgroundColor: data.map(([val]) =>
                    val >= min && val <= max ? '#87CEEB' : '#DDDDDD'
                ),
                hoverBackgroundColor: '#B0B0B0',
                data: data.map(([_, frequency]) => frequency),
                categoryPercentage: 0.9,
                barPercentage: 1.0,
            },
        ],
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore for 'hidden'
    return <Bar data={barData} options={options} />;
};

export default BarChart;

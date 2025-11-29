'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler
);

interface SparklineProps {
    data: number[];
    color?: string;
    height?: number;
}

export function Sparkline({ data, color = '#1E9CFF', height = 60 }: SparklineProps) {
    const chartData = {
        labels: data.map((_, i) => i.toString()),
        datasets: [
            {
                data: data,
                borderColor: color,
                backgroundColor: (context: any) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, height);
                    gradient.addColorStop(0, `${color}40`); // 25% opacity
                    gradient.addColorStop(1, `${color}00`); // 0% opacity
                    return gradient;
                },
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
        },
        scales: {
            x: { display: false },
            y: { display: false, min: Math.min(...data) * 0.95, max: Math.max(...data) * 1.05 },
        },
        interaction: {
            intersect: false,
        },
    };

    return (
        <div style={{ height }}>
            <Line data={chartData} options={options} />
        </div>
    );
}

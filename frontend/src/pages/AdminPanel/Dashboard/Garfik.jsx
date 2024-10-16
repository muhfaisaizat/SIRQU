import React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'; // Pastikan path ini benar

const chartData = [
    // { month: 'January', penjualan: 1860000 },
    // { month: 'February', penjualan: 3050000 },
    // { month: 'March', penjualan: 2370000 },
    // { month: 'April', penjualan: 730000 },
    // { month: 'May', penjualan: 2090000 },
    // { month: 'June', penjualan: 2140000 },
];


const chartConfig = {
    Penjualan: {
        label: 'Penjualan',
        color: '#CBD5E1',
    },
};

const Garfik = () => {
    return (
        <div className='border-2 rounded-[8px] h-[352px] w-[67%] p-[24px] grid gap-[24px]'>
            <h1 className='text-[16px] font-semibold'>Grafik Penjualan</h1>
            <ChartContainer config={chartConfig} className="h-[249px] w-full">
                <BarChart data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <YAxis
                        tickFormatter={(value) => {
                            if (value >= 1000000) {
                                return `${value / 1000000}jt`;
                            } else {
                                return `${value / 1000}rb`;
                            }
                        }}
                        ticks={[0, 500000, 1000000, 1500000, 2000000, 2500000, 3000000, 3500000, 4000000, 4500000, 5000000]} 
                        domain={[0, 5000000]}
                        axisLine={false}
                        tickLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="penjualan" fill={chartConfig.Penjualan.color} radius={4} />
                </BarChart>
            </ChartContainer>
        </div>
    )
}

export default Garfik

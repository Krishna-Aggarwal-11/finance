"use client" 


import { useGetSummary } from './../features/summary/api/use-get-summary';
import { Chart, ChartLoading } from './chart';
import { SpendingPie, SpendingPieLoading } from './spending-pie';

export const DataCharts = () =>{
    const {data , isLoading} = useGetSummary() ;

    if (isLoading) {
        return (
            <div className='grid grid-cols-1 lg:grid-cols-6 gap-8'>
            <div className='col-span-1 xl:col-span-4 lg:col-span-3'>
                <ChartLoading/>
            </div>
            <div className='col-span-1 xl:col-span-2 lg:col-span-3'>
                <SpendingPieLoading  />
            </div>
        </div>
        )
    }
    return (
        <div className='grid grid-cols-1 lg:grid-cols-6 gap-8'>
            <div className='col-span-1 xl:col-span-4 lg:col-span-3'>
                <Chart data = {data?.days} />
            </div>
            <div className='col-span-1 xl:col-span-2 lg:col-span-3'>
                <SpendingPie data = {data?.categories} />
            </div>
        </div>
    )
}
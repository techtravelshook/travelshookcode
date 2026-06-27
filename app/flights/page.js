

'use client';

import dynamic from 'next/dynamic'

const FlightHeader =dynamic(()=>import('@/components/flightservice/Header'))
const FlightContent = dynamic(() => import('@/components/flightservice/FlightContent'), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-slate-100 animate-pulse rounded-2xl" />
})

const FlightRates = dynamic(() => import('@/components/flightservice/FlightRates'), {
  ssr: false,
  loading: () => <div className="h-[300px] bg-slate-100 animate-pulse rounded-2xl" />
})

const FlightsInfo = dynamic(() => import('@/components/home/FlightsInfo'), { ssr: false })
const BookingProcess = dynamic(() => import('@/components/hajjumrah/BookingProcess'), { ssr: false })

export default function FlightClientWrapper() {
  return (
    <>
    <FlightHeader/>
      <FlightContent/>
      <FlightRates/>
      <FlightsInfo/>
      <BookingProcess/>
    </>
  )
}
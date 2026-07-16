

'use client';

import CustomSlider from '@/components/CustomSlider';
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
  const flights=[
    "imgs/sliderimgs/fl1.webp",
    "imgs/sliderimgs/fl2.webp",
    "imgs/sliderimgs/fl3.webp",
    "imgs/sliderimgs/fl4.webp",
     "imgs/sliderimgs/f007.webp",
    "imgs/sliderimgs/f008.webp",
    "imgs/sliderimgs/fl5.webp",
    "imgs/sliderimgs/fl1.webp",
  ]
  return (
    <>
    <FlightHeader/>
      <FlightContent/>
      <FlightRates/>
      <FlightsInfo/>
     
      <BookingProcess/>
      <CustomSlider images={flights}/>
      
    </>
  )
}
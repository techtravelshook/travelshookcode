import FlightContent from '@/components/flightservice/FlightContent'
import FlightRates from '@/components/flightservice/FlightRates'
import FlightHeader from '@/components/flightservice/Header'
import BookingProcess from '@/components/hajjumrah/BookingProcess'
import FlightsInfo from '@/components/home/FlightsInfo'
import React from 'react'

export default function FlightPage() {
  return (
    <div>
<FlightHeader/>
<FlightContent/>
<FlightRates/>
<FlightsInfo/>
<BookingProcess/>
    </div>
  )
}


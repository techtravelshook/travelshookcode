"use client";

import ContactBanner from '@/components/contactus/ContactBanner';
import ContactInfo from '@/components/contactus/ContactInfo';
import ContactLocations from '@/components/contactus/ContactLocations';
import OfficeMap from '@/components/contactus/ContactMaps';
import React from 'react'

function page() {
  return (
    <div>
        <ContactBanner/>
        <ContactInfo/>
        <ContactLocations/>
        <OfficeMap/>
    </div>
  )
}

export default page
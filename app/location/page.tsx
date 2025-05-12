'use client'

import React, { useState, useEffect } from 'react'
import { Location } from '@prisma/client'
import Link from 'next/link'

const LocationPage = () => {
    
    const [locations, setLocations] = useState<Location[]>([])

    useEffect(() => {
        const fetchLocations = async () => {
            const response = await fetch('/api/location')
            const data = await response.json()
            setLocations(data)
        }

        fetchLocations()
    }, [])

    return(
        <div>
            { locations.map((location) => (
                <div key={location.id}>
                    <Link href={`/location/${location.id}`}>{location.locationName}</Link>
                </div>
            ))}
        </div>
    )
}

export default LocationPage
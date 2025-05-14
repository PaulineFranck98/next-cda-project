'use client'


import React , { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useUser } from  '@clerk/nextjs'
import Link from 'next/link'

const LocationDetailPage = () => {

    const params = useParams()

    const [location, setLocation] = useState<LocationType | null>(null)

    useEffect(() => {
        const fetchLocation = async () => {
            const response = await fetch(`/api/location/${params.locationId}`)
            const data: LocationType = await response.json()
            setLocation(data)
        }
        fetchLocation()
    }, [params.locationId])

    // const { user } = useUser();
    // vérifier ici si owner ou non

    
  return (
    <div>
        { location && (
            <div>
                <p>{location.locationName}</p>
                <p>{location.description}</p>
                <Link href={`/location/${location.id}/completeLocation`}>Compléter les informations</Link>
            </div>
        )}
      
    </div>
  )
}

export default LocationDetailPage

'use client'

import React, {useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

const AddLocation: React.FC = () => {

    // const { isSignedIn } = useUser();

    const [locationName, setLocationName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [city, setCity] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [website, setWebsite] = useState("");


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // if(isSignedIn == false){
        //     return;
        // }

        try {
            const locationPayload = {
                locationName,
                description,
                address,
                city,
                zipcode,
                phoneNumber,
                website,
                latitude,
                longitude
            };

            console.log("locationPayload : ", locationPayload)

            const response = await fetch('/api/location', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(locationPayload),
            });

        } catch(error){
            console.error("Error submitting location: ", error);
        }
    }

    return(
        <div className='w-screen mx-auto'>
            <h1 className='text-2xl font-bold mb-6 text-center'>Ajouter un nouveau lieu</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 items-center'>
                <div className='flex flex-col gap-2 w-80'>
                    <label htmlFor="locationName" >Nom du lieu</label>
                    <input 
                        id="locationName"
                        type="text" 
                        value={locationName}
                        onChange={(e) => setLocationName(e.target.value)}
                        required
                        className='bg-gray-100 rounded-md border-gray-200 border-1 h-9'
                    />
                </div>
                <div className='flex flex-col gap-2 w-80 mt-2'>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className='bg-gray-100 rounded-md resize-none border-gray-200 border-1'
                    />
                </div>
                <div className='flex flex-col gap-2 w-80 mt-2'>
                    <label htmlFor="address">Adresse</label>
                    <input 
                        id="address"
                        type="text" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className='bg-gray-100 rounded-md border-gray-200 border-1 h-9'
                    />
                </div>
                <div className='flex flex-col gap-2 w-80 mt-2'>
                    <label htmlFor="city">Ville</label>
                    <input 
                        id="city"
                        type="text" 
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        className='bg-gray-100 rounded-md border-gray-200 border-1 h-9'
                    />
                </div>
                <div className='flex flex-col gap-2 w-80 mt-2'>
                    <label htmlFor="zipcode">Code postal</label>
                    <input 
                        id="zipcode"
                        type="text" 
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                        required
                        className='bg-gray-100 rounded-md border-gray-200 border-1 h-9'
                    />
                </div>
                <div className='flex flex-col gap-2 w-80 mt-2'>
                    <label htmlFor="phoneNumber">Numéro de téléphone</label>
                    <input 
                        id="phoneNumber"
                        type="text" 
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        className='bg-gray-100 rounded-md border-gray-200 border-1 h-9'
                    />
                </div>
                <div className='flex flex-col gap-2 w-80 mt-2'>
                    <label htmlFor="website">Site web</label>
                    <input 
                        id="website"
                        type="text" 
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        required
                        className='bg-gray-100 rounded-md border-gray-200 border-1 h-9'
                    />
                </div>
                <div className='flex flex-col gap-2 w-80 mt-2'>
                    <label htmlFor="latitude">Latitude</label>
                    <input 
                        id="latitude"
                        type="number" 
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        required
                        className='bg-gray-100 rounded-md border-gray-200 border-1 h-9'
                    />
                </div>
                <div className='flex flex-col gap-2 w-80 mt-2'>
                    <label htmlFor="longitude">Longitude</label>
                    <input 
                        id="longitude"
                        type="number" 
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        required
                        className='bg-gray-100 rounded-md border-gray-200 border-1 h-9'
                    />
                </div>
            
                <button type="submit"  className='bg-indigo-700 text-white py-2 px-4 rounded-md w-fit'>Ajouter</button>
            </form>
        </div>
    )

}

export default AddLocation
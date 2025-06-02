// 'use client'

import React, {useState} from 'react';
import { useRouter } from 'next/navigation';
// import { useUser } from '@clerk/nextjs';

const AddLocation: React.FC = () => {

    const router = useRouter();

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

            if(response.ok)
            {
                const location = await response.json();
                router.push(`/dashboard//location/${location.id}`)
            }


        } catch(error){
            console.error("Error submitting location: ", error);
        }
    }

    return(
       

        <div className="mx-auto  max-w-5xl">
            <h1 className="text-2xl font-bold mb-6 text-center">Ajouter un établissement</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-center">
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 w-full mx-auto">
                {/* Nom du lieu */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="locationName">Nom du lieu</label>
                    <input
                    id="locationName"
                    type="text"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    required
                    className="bg-gray-100 rounded-md border border-gray-300 h-9 px-3"
                    />
                </div>

                {/* Adresse */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="address">Adresse</label>
                    <input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="bg-gray-100 rounded-md border border-gray-300 h-9 px-3"
                    />
                </div>

                {/* Code postal */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="zipcode">Code postal</label>
                    <input
                    id="zipcode"
                    type="text"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    required
                    className="bg-gray-100 rounded-md border border-gray-300 h-9 px-3"
                    />
                </div>

                {/* Ville */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="city">Ville</label>
                    <input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="bg-gray-100 rounded-md border border-gray-300 h-9 px-3"
                    />
                </div>

                {/* Numéro de téléphone */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="phoneNumber">Numéro de téléphone</label>
                    <input
                    id="phoneNumber"
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="bg-gray-100 rounded-md border border-gray-300 h-9 px-3"
                    />
                </div>

                {/* Site web */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="website">Site web</label>
                    <input
                    id="website"
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    required
                    className="bg-gray-100 rounded-md border border-gray-300 h-9 px-3"
                    />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2 lg:col-span-2">
                    <label htmlFor="description">Description</label>
                    <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={4}
                    className="bg-gray-100 rounded-md resize-none border border-gray-300 px-3 py-2"
                    />
                </div>

                {/* Champs cachés latitude/longitude */}
                <div className="">
                    <label htmlFor="latitude">Latitude</label>
                    <input
                    id="latitude"
                    type="number"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    />
                </div>
                <div className="">
                    <label htmlFor="longitude">Longitude</label>
                    <input
                    id="longitude"
                    type="number"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    />
                </div>
                </div>

                {/* Bouton */}
                <button
                type="submit"
                className="mt-6 bg-violet-700 text-white py-2 px-4 rounded-md cursor-pointer"
                >
                Ajouter
                </button>
            </form>
            </div>

    )

}

export default AddLocation



 // <div className=' mx-auto'>
        //     <h1 className='text-2xl font-bold mb-6 text-center'>Ajouter un nouveau lieu</h1>
        //     <form onSubmit={handleSubmit} className='flex flex-col gap-4 items-center'>
                
        //         <div className='flex flex-col gap-2 w-80'>
        //             <label htmlFor="locationName" >Nom du lieu</label>
        //             <input 
        //                 id="locationName"
        //                 type="text" 
        //                 value={locationName}
        //                 onChange={(e) => setLocationName(e.target.value)}
        //                 required
        //                 className='bg-gray-100 rounded-md border-gray-300 border-1 h-9'
        //             />
        //         </div>
              
        //         <div className='flex flex-col gap-2 w-80 mt-2'>
        //             <label htmlFor="address">Adresse</label>
        //             <input 
        //                 id="address"
        //                 type="text" 
        //                 value={address}
        //                 onChange={(e) => setAddress(e.target.value)}
        //                 required
        //                 className='bg-gray-100 rounded-md border-gray-300 border-1 h-9'
        //             />
        //         </div>
        //         <div className='flex flex-col gap-2 w-80 mt-2'>
        //             <label htmlFor="city">Ville</label>
        //             <input 
        //                 id="city"
        //                 type="text" 
        //                 value={city}
        //                 onChange={(e) => setCity(e.target.value)}
        //                 required
        //                 className='bg-gray-100 rounded-md border-gray-300 border-1 h-9'
        //             />
        //         </div>
        //         <div className='flex flex-col gap-2 w-80 mt-2'>
        //             <label htmlFor="zipcode">Code postal</label>
        //             <input 
        //                 id="zipcode"
        //                 type="text" 
        //                 value={zipcode}
        //                 onChange={(e) => setZipcode(e.target.value)}
        //                 required
        //                 className='bg-gray-100 rounded-md border-gray-300 border-1 h-9'
        //             />
        //         </div>
        //         <div className='flex flex-col gap-2 w-80 mt-2'>
        //             <label htmlFor="phoneNumber">Numéro de téléphone</label>
        //             <input 
        //                 id="phoneNumber"
        //                 type="text" 
        //                 value={phoneNumber}
        //                 onChange={(e) => setPhoneNumber(e.target.value)}
        //                 required
        //                 className='bg-gray-100 rounded-md border-gray-300 border-1 h-9'
        //             />
        //         </div>
        //         <div className='flex flex-col gap-2 w-80 mt-2'>
        //             <label htmlFor="website">Site web</label>
        //             <input 
        //                 id="website"
        //                 type="text" 
        //                 value={website}
        //                 onChange={(e) => setWebsite(e.target.value)}
        //                 required
        //                 className='bg-gray-100 rounded-md border-gray-300 border-1 h-9'
        //             />
        //         </div>
        //         <div className='flex flex-col gap-2 w-80 mt-2'>
        //             <label htmlFor="description">Description</label>
        //             <textarea
        //                 id="description"
        //                 value={description} 
        //                 onChange={(e) => setDescription(e.target.value)}
        //                 required
        //                 className='bg-gray-100 rounded-md resize-none border-gray-300 border-1'
        //             />
        //         </div>
        //         <div className='flex flex-col gap-2 w-80 mt-2 hidden'>
        //             <label htmlFor="latitude">Latitude</label>
        //             <input 
        //                 id="latitude"
        //                 type="number" 
        //                 value={latitude}
        //                 onChange={(e) => setLatitude(e.target.value)}
        //                 required
        //                 className='bg-gray-100 rounded-md border-gray-300 border-1 h-9'
        //             />
        //         </div>
        //         <div className='flex flex-col gap-2 w-80 mt-2 hidden'>
        //             <label htmlFor="longitude">Longitude</label>
        //             <input 
        //                 id="longitude"
        //                 type="number" 
        //                 value={longitude}
        //                 onChange={(e) => setLongitude(e.target.value)}
        //                 required
        //                 className='bg-gray-100 rounded-md border-gray-300 border-1 h-9'
        //             />
        //         </div>
            
        //         <button type="submit"  className='bg-indigo-700 text-white py-2 px-4 rounded-md w-fit'>Ajouter</button>
        //     </form>
        // </div>
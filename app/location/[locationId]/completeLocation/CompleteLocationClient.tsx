'use client'

import React, {useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TypeSelector from '@/components/location/TypeSelector';
import { Type, Duration, Price, Confort, Intensity } from '@prisma/client';
import DurationSelector from '@/components/location/DurationSelector';
import PriceSelector from '@/components/location/PriceSelector';
import ConfortSelector from '@/components/location/ConfortSelector';
import IntensitySelector from '@/components/location/IntensitySelector';

interface Props {
    locationId: string;
}

const CompleteLocation: React.FC<Props> = ({ locationId }) => {
    const router = useRouter();

    const [types, setTypes] = useState<Type[]>([]);
    const [selectedTypeId, setSelectedTypeId] = useState<string>('');

    const [durations, setDurations] = useState<Duration[]>([]);
    const [selectedDurationId, setSelectedDurationId] = useState<string>('');

    const [prices, setPrices] = useState<Price[]>([]);
    const [selectedPriceId, setSelectedPriceId] = useState<string>('');

    const [conforts, setConforts] = useState<Confort[]>([]);
    const [selectedConfortId, setSelectedConfortId] = useState<string>('');

    const [intensities, setIntensities] = useState<Intensity[]>([]);
    const [selectedIntensityId, setSelectedIntensityId] = useState<string>('');

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchTypes = async () => {

            try {
                const response = await fetch('/api/type');
                const data = await response.json();
                setTypes(data)
            } catch(error) {
                console.error("Error fetching types: ", error);
            }
        };

        const fetchDurations = async () => {
            try{
                const response = await fetch('/api/duration');
                const data = await response.json();
                setDurations(data);
            } catch(error){
                console.error("Error fetching durations: ", error);
            }
        };

        const fetchPrices = async () => {
            try {
                const response = await fetch('/api/price');
                const data = await response.json();
                setPrices(data);
            } catch(error) {
                console.error("Error while fetching prices: ", error);
            };
        }

        const fetchConforts = async () => {
            try {
                const response = await fetch('/api/confort');
                const data = await response.json();
                setConforts(data);
            } catch(error) {
                console.error("Error fetching conforts: ", error);
            };
        }

        const fetchIntensities = async () => {
            try {
                const response = await fetch('/api/intensity');
                const data = await response.json();
                setIntensities(data)
            } catch(error) {
                console.error("Error fetching intensities: ", error)
            };
        }

        fetchTypes();
        fetchDurations();
        fetchPrices();
        fetchConforts();
        fetchIntensities();
    }, []);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await fetch(`/api/location/${locationId}`);
                const location = await response.json();

                setSelectedTypeId(location.typeId ?? '');
                setSelectedDurationId(location.durationId ?? '');
                setSelectedPriceId(location.priceId ?? '');
                setSelectedConfortId(location.confortId ?? '');
                setSelectedIntensityId(location.intensityId ?? '');
            } catch(error)
            {
                console.error("Error fetching location: ", error);
            }
        };

        if(locationId){
            fetchLocation()
        }
    }, [locationId])



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(locationId == null) return;

        // pour permettre d'enregistrer sans tout ajouter
        const updateData: Record<string, string> = {};
        if(selectedTypeId) updateData.typeId = selectedTypeId;
        if(selectedDurationId) updateData.durationId = selectedDurationId;
        if(selectedPriceId) updateData.priceId = selectedPriceId;
        if(selectedConfortId) updateData.confortId = selectedConfortId;
        if(selectedIntensityId) updateData.intensityId = selectedIntensityId;


        setIsSubmitting(true);
        try {
            const response = await fetch(`/api/location/${locationId}/completeLocation`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateData)
            });

            if(response.ok){
                router.push('/profile'); // TODO : change route
            } else {
                console.error('Error updating')
            }
        } catch(error) {
            console.error('Error during request :', error)
        } finally { // to keep ?
            setIsSubmitting(false)
        }
    };


    return(
        <div className="max-w-xl mx-auto p-4">
            <h1 className='text-2xl font-bold mb-4'>Compléter les informations du lieu</h1>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <TypeSelector 
                    types={types}
                    selectedTypeId={selectedTypeId}
                    onChange={(id) => setSelectedTypeId(id)}
                />
                <DurationSelector 
                    durations={durations}
                    selectedDurationId={selectedDurationId}
                    onChange={(id) => setSelectedDurationId(id)}
                />
                <PriceSelector 
                    prices={prices}
                    selectedPriceId={selectedPriceId}
                    onChange={(id) => setSelectedPriceId(id)}
                />
                <ConfortSelector 
                    conforts={conforts}
                    selectedConfortId={selectedConfortId}
                    onChange={(id) => setSelectedConfortId(id)}
                />
                <IntensitySelector 
                    intensities={intensities}
                    selectedIntensityId={selectedIntensityId}
                    onChange={(id) => setSelectedIntensityId(id)}
                />

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className='bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50'
                    >
                        {isSubmitting ? 'Enregistrement ...' : 'Enregistrer'}

                </button>
            </form>
        </div>    
    )
}

export default CompleteLocation
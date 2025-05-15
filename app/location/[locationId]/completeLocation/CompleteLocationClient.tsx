'use client'

import React, {useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TypeSelector from '@/components/location/TypeSelector';
import { Type, Duration, Price, Confort, Intensity, Theme, Companion } from '@prisma/client';
import DurationSelector from '@/components/location/DurationSelector';
import PriceSelector from '@/components/location/PriceSelector';
import ConfortSelector from '@/components/location/ConfortSelector';
import IntensitySelector from '@/components/location/IntensitySelector';
import ThemeCheckboxGroup from '@/components/location/ThemeCheckboxGroup';
import CompanionCheckboxGroup from '@/components/location/CompanionCheckboxGroup';
import ImageUploader from '@/components/location/ImageUploader';

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

    const [themes, setThemes] = useState<Theme[]>([]);
    const [selectedThemeIds, setSelectedThemeIds] = useState<string[]>([]);

    const [companions, setCompanions] = useState<Companion[]>([]);
    const [selectedCompanionIds, setSelectedCompanionIds] = useState<string[]>([]);

    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [deletedImagesUrls, setDeletedImagesUrls] =  useState<string[]>([]);

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

        const fetchThemes = async () => {
            try {
                const response = await fetch('/api/theme');
                const data = await response.json();
                setThemes(data);
            } catch(error) {
                console.error("Error fetching themes: ", error);
            }
        }

        const fetchCompanions = async () => {
            try {
                const response = await fetch('/api/companion')
                const data = await response.json();
                setCompanions(data);
            } catch(error) {
                console.error("Error fetching companions: ", error);
            }
        }

        fetchTypes();
        fetchDurations();
        fetchPrices();
        fetchConforts();
        fetchIntensities();
        fetchThemes();
        fetchCompanions();
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
                setSelectedThemeIds(location.themes?.map((theme: any) => theme.themeId) ?? []);
                setSelectedCompanionIds(location.companions?.map((companion: any) => companion.companionId) ?? []);
                setUploadedImages(location.images?.map((img: any) => img.imageName) ?? []);

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

        setIsSubmitting(true);

        try {

            // pour permettre d'enregistrer sans tout ajouter
            const updateData: Record<string, any> = {};
            if(selectedTypeId) updateData.typeId = selectedTypeId;
            if(selectedDurationId) updateData.durationId = selectedDurationId;
            if(selectedPriceId) updateData.priceId = selectedPriceId;
            if(selectedConfortId) updateData.confortId = selectedConfortId;
            if(selectedIntensityId) updateData.intensityId = selectedIntensityId;
            if(selectedThemeIds.length > 0) updateData.themeIds = selectedThemeIds;
            if(selectedCompanionIds.length > 0) updateData.companionIds = selectedCompanionIds;
            if(deletedImagesUrls.length > 0 ) updateData.deletedImagesUrls = deletedImagesUrls;

            console.log("Deleted images : ", deletedImagesUrls); // TODO : delete

      
            const response = await fetch(`/api/location/${locationId}/completeLocation`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateData)
            });

            if(response.ok){
                console.log("response ok : ", response);  // TODO : delete
                for (const url of deletedImagesUrls) {
                    const publicId = extractPublicIdFromUrl(url);
                    console.log('public ID' , publicId);
                    if(publicId){
                        console.log('public ID ? ', publicId); // TODO : delete
                        await fetch('/api/image/delete', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({publicId}),
                        });
                    }
                }
                    
                router.push('/profile'); // TODO : change route
            } else {
                console.error('Error updating')
            }
        } catch(error) {
            console.error('Error during request :', error)
        } finally { 
            setIsSubmitting(false)
        }

        // extracts public id
        function extractPublicIdFromUrl(url: string): string | null {
            const match = url.match(/\/v\d+\/(.+?)\.(jpg|png|jpeg|webp)$/);
            return match ? match[1] : null;
        }

    };


    return(
        <div className="max-w-xl mx-auto p-4">
            <h1 className='text-2xl font-bold mb-4 text-center'>Compléter les informations du lieu</h1>
            <form onSubmit={handleSubmit} className='space-y-4  flex flex-col'>
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
                <ThemeCheckboxGroup 
                    themes={themes}
                    selectedThemeIds={selectedThemeIds}
                    onChange={setSelectedThemeIds}
                />
                <CompanionCheckboxGroup
                    companions={companions}
                    selectedCompanionIds={selectedCompanionIds}
                    onChange={setSelectedCompanionIds}
                />
                <ImageUploader 
                    locationId={locationId}
                    initialImages={uploadedImages}
                    onImagesUpdated={(images) => setUploadedImages(images)}
                    onImagesDeleted={(deleted) => setDeletedImagesUrls(deleted)}
                />

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className='bg-violet-800 text-white px-4 py-2 rounded disabled:opacity-50 cursor-pointer hover:opacity-80 duration-300 transition-all'
                    >
                        {isSubmitting ? 'Enregistrement ...' : 'Enregistrer'}

                </button>
            </form>
        </div>    
    )
}

export default CompleteLocation
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TypeSelector from '@/components/location/TypeSelector';
import { Type, Duration, Confort, Intensity, Theme, Companion } from '@prisma/client';
import DurationSelector from '@/components/location/DurationSelector';
import PriceSelector from '@/components/location/PriceSelector';
import ConfortSelector from '@/components/location/ConfortSelector';
import IntensitySelector from '@/components/location/IntensitySelector';
import ThemeCheckboxGroup from '@/components/location/ThemeCheckboxGroup';
import CompanionCheckboxGroup from '@/components/location/CompanionCheckboxGroup';
import ImageUploader from '@/components/location/ImageUploader';
import { useAuth } from '@clerk/nextjs';
import { ThemeLocationType, CompanionLocationType, ImageType } from "@/types/types";
import toast from 'react-hot-toast';
import { useLoading } from '@/context/LoadingContext';

interface Props {
    locationId: string;
}

type UpdateLocationData = {
    typeId?: string;
    durationId?: string;
    confortId?: string;
    intensityId?: string;
    themeIds?: string[];
    companionIds?: string[];
    deletedImagesUrls?: string[];
    minPrice?: number;
    maxPrice?: number;

};

const CompleteLocation: React.FC<Props> = ({ locationId }) => {

    const { userId } = useAuth();
    const router = useRouter();

    const [types, setTypes] = useState<Type[]>([]);
    const [selectedTypeId, setSelectedTypeId] = useState<string>('');

    const [durations, setDurations] = useState<Duration[]>([]);
    const [selectedDurationId, setSelectedDurationId] = useState<string>('');

    const [minPrice, setMinPrice] = useState<number | ''>('');
    const [maxPrice, setMaxPrice] = useState<number | ''>('');

    const [conforts, setConforts] = useState<Confort[]>([]);
    const [selectedConfortId, setSelectedConfortId] = useState<string>('');

    const [intensities, setIntensities] = useState<Intensity[]>([]);
    const [selectedIntensityId, setSelectedIntensityId] = useState<string>('');

    const [themes, setThemes] = useState<Theme[]>([]);
    const [selectedThemeIds, setSelectedThemeIds] = useState<string[]>([]);

    const [companions, setCompanions] = useState<Companion[]>([]);
    const [selectedCompanionIds, setSelectedCompanionIds] = useState<string[]>([]);

    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [deletedImagesUrls, setDeletedImagesUrls] = useState<string[]>([]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { setLoading } = useLoading();

    useEffect(() => {
        const fetchTypes = async () => {

            try {
                const response = await fetch('/api/type');
                const data = await response.json();
                setTypes(data)
            } catch (error) {
                console.error("Error fetching types: ", error);
            }
        };

        const fetchDurations = async () => {
            try {
                const response = await fetch('/api/duration');
                const data = await response.json();
                setDurations(data);
            } catch (error) {
                console.error("Error fetching durations: ", error);
            }
        };


        const fetchConforts = async () => {
            try {
                const response = await fetch('/api/confort');
                const data = await response.json();
                setConforts(data);
            } catch (error) {
                console.error("Error fetching conforts: ", error);
            };
        }

        const fetchIntensities = async () => {
            try {
                const response = await fetch('/api/intensity');
                const data = await response.json();
                setIntensities(data)
            } catch (error) {
                console.error("Error fetching intensities: ", error)
            };
        }

        const fetchThemes = async () => {
            try {
                const response = await fetch('/api/theme');
                const data = await response.json();
                setThemes(data);
            } catch (error) {
                console.error("Error fetching themes: ", error);
            }
        }

        const fetchCompanions = async () => {
            try {
                const response = await fetch('/api/companion')
                const data = await response.json();
                setCompanions(data);
            } catch (error) {
                console.error("Error fetching companions: ", error);
            }
        }

        fetchTypes();
        fetchDurations();
        fetchConforts();
        fetchIntensities();
        fetchThemes();
        fetchCompanions();
    }, []);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                setLoading(true);

                const response = await fetch(`/api/location/${locationId}`);
                const location = await response.json();
                setSelectedTypeId(location.typeId ?? '');
                setSelectedDurationId(location.durationId ?? '');
                setMinPrice(location.minPrice ?? '');
                setMaxPrice(location.maxPrice ?? '');
                setSelectedConfortId(location.confortId ?? '');
                setSelectedIntensityId(location.intensityId ?? '');
                setSelectedThemeIds(location.themes?.map((theme: ThemeLocationType) => theme.themeId) ?? []);
                setSelectedCompanionIds(location.companions?.map((companion: CompanionLocationType) => companion.companionId) ?? []);
                setUploadedImages(location.images?.map((img: ImageType) => img.imageName) ?? []);
            } catch (error) {
                console.error("Error fetching location: ", error);
            } finally {
                setLoading(false)
            }
        };

        if (locationId) {
            fetchLocation()
        }
    }, [locationId, userId, setLoading])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (locationId == null) return;

        setIsSubmitting(true);

        try {
            // pour permettre d'enregistrer sans tout ajouter
            const updateData: UpdateLocationData = {};
            if (selectedTypeId) updateData.typeId = selectedTypeId;
            if (selectedDurationId) updateData.durationId = selectedDurationId;
            if (minPrice !== '' && maxPrice !== '' && minPrice <= maxPrice) {
                updateData.minPrice = Number(minPrice);
                updateData.maxPrice = Number(maxPrice);
            }
            if (selectedConfortId) updateData.confortId = selectedConfortId;
            if (selectedIntensityId) updateData.intensityId = selectedIntensityId;
            if (selectedThemeIds.length > 0) updateData.themeIds = selectedThemeIds;
            if (selectedCompanionIds.length > 0) updateData.companionIds = selectedCompanionIds;
            if (deletedImagesUrls.length > 0) updateData.deletedImagesUrls = deletedImagesUrls;

            console.log("Deleted images : ", deletedImagesUrls); // TODO : delete

            const response = await fetch(`/api/location/${locationId}/completeLocation`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateData)
            });

            if (response.ok) {
                for (const url of deletedImagesUrls) {
                    const publicId = extractPublicIdFromUrl(url);
                    console.log('public ID', publicId);
                    if (publicId) {
                        await fetch('/api/image/delete', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ publicId }),
                        });
                    }
                }
                router.push(`/dashboard/location/${locationId}`);
            } else {
                console.error('Error updating')
            }
        } catch (error) {
            console.error('Error during request :', error)
            toast.error('Erreur lors de la modification', { duration: 3000, style: { background: '#FFC8C9' } });
        } finally {
            toast.success('Enregistré avec succès', { duration: 3000 });
            setIsSubmitting(false)
        }

        // extracts public id
        function extractPublicIdFromUrl(url: string): string | null {
            const match = url.match(/\/v\d+\/(.+?)\.(jpg|png|jpeg|webp)$/);
            return match ? match[1] : null;
        }

    };

    const handlePriceChange = (field: "minPrice" | "maxPrice", value: number | "") => {
        if (field === "minPrice") {
            setMinPrice(value);
        } else {
            setMaxPrice(value);
        }
    }

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className='text-2xl font-bold mb-4 text-center'>Compléter les informations du lieu</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
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
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        onChange={handlePriceChange}
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

                    <div className="lg:col-span-2">
                        <ThemeCheckboxGroup
                            themes={themes}
                            selectedThemeIds={selectedThemeIds}
                            onChange={setSelectedThemeIds}
                        />
                    </div>
                    <div className="lg:col-span-2">
                        <CompanionCheckboxGroup
                            companions={companions}
                            selectedCompanionIds={selectedCompanionIds}
                            onChange={setSelectedCompanionIds}
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <ImageUploader
                        locationId={locationId}
                        initialImages={uploadedImages}
                        onImagesUpdated={(images) => setUploadedImages(images)}
                        onImagesDeleted={(deleted) => setDeletedImagesUrls(deleted)}
                    />
                </div>

                <div className="mt-6 flex justify-center">
                    <button type="submit" disabled={isSubmitting} className="bg-violet-800 text-white px-6 py-3 rounded-md disabled:opacity-50 cursor-pointer hover:opacity-80 transition-all">
                        {isSubmitting ? 'Enregistrement ...' : 'Enregistrer'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CompleteLocation
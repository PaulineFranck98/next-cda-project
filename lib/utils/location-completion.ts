import { LocationType } from '@/types/types'; 

export function calculateCompletion(location: LocationType): number { 
  const fields = [
    location.locationName,
    location.description,
    location.address,
    location.city,
    location.zipcode,
    location.phoneNumber,
    location.website,
    location.latitude,
    location.longitude,
    location.type?.id,
    location.duration?.id,
    location.price?.id,
    location.confort?.id,
    location.intensity?.id,
    location.images?.length > 0,
    location.themes?.length > 0,
    location.companions?.length > 0,
  ];

  const filledFields = fields.filter(Boolean).length;
  const totalFields = fields.length;

  return Math.round((filledFields / totalFields) * 100);
}
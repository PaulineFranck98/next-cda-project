export function calculateCompletion(location: any): number {
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
    location.typeId,
    location.durationId,
    location.priceId,
    location.confortId,
    location.intensityId,
    location.images?.length > 0, 
    location.themes?.length > 0,
    location.companions?.length > 0,
  ];

  const filledFields = fields.filter(Boolean).length;
  const totalFields = fields.length;

  return Math.round((filledFields / totalFields) * 100);
}

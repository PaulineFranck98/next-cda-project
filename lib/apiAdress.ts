export type AdressResult = {
    name: string;
    postcode: string;
    city: string;
    latitude: number;
    longitude: number;
};

export async function searchAdresses(query: string, city?: string): Promise<AdressResult[]> {
    let url = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5`;
    if (city) url += `&city=${encodeURIComponent(city)}`;
    const response = await fetch(url);

    if (!response.ok)
        throw new Error('Erreur API Adresse');

    const data = await response.json();
    return data.features.map((feature: {
        properties: {
            name: string;
            postcode: string;
            city: string;
        };
        geometry: {
            coordinates: [number, number];
        };
    }) => ({
        name: feature.properties.name,
        postcode: feature.properties.postcode,
        city: feature.properties.city,
        latitude: feature.geometry.coordinates[1],
        longitude: feature.geometry.coordinates[0],
    }));
}

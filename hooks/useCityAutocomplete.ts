import { useState, useEffect } from 'react';
import { searchCommunes, CommuneResult } from '@/lib/geoGouv';

export type CitySuggestion = {
    name: string;
    code: string;
    postcodes: string[];
    lat: number;
    lon: number;
};

export function useCityAutocomplete(query: string) {
    const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (query.length < 3) {
            setSuggestions([]);
            return;
        }
        setLoading(true);
        setError(null);
        searchCommunes(query)
            .then((results) => {
                const cities = results.map((item: CommuneResult) => ({
                    name: item.nom,
                    code: item.code,
                    postcodes: item.codesPostaux,
                    lat: item.centre.coordinates[1],
                    lon: item.centre.coordinates[0],
                })
            );
            setSuggestions(cities);
            })
            .catch(() => setError('Erreur de recherche'))
            .finally(() => setLoading(false));
    }, [query]);

  return { suggestions, loading, error };
}

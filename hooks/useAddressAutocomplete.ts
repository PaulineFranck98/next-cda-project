import { useState, useEffect } from 'react';
import { searchAdresses, AdressResult } from '@/lib/apiAdress';

export type AddressSuggestion = AdressResult;

export function useAddressAutocomplete(query: string, city: string) {
    const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    if (query.length < 4 || !city) {
        setSuggestions([]);
        return;
    }
    setLoading(true);
    setError(null);
    searchAdresses(query, city)
        .then((results) => {
        setSuggestions(results);
        })
        .catch(() => setError('Erreur de recherche'))
        .finally(() => setLoading(false));
    }, [query, city]);

    return { suggestions, loading, error };
}

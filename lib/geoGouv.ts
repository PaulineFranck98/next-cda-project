export type CommuneResult = {
    nom: string;
    code: string;
    codesPostaux: string[];
    centre: { coordinates: [number, number] };
};

export async function searchCommunes(query: string): Promise<CommuneResult[]> {
    const url = `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(query)}&fields=nom,code,codesPostaux,centre&boost=population&limit=5`;
    const res = await fetch(url);
    if (!res.ok)  throw new Error('Erreur API Geo');
    return await res.json();
}

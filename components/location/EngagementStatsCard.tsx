import Link from "next/link";
import { LocationType } from "@/types/types";
import { Heart } from 'lucide-react';
import { Map } from 'lucide-react';
import { ChartNoAxesCombined } from 'lucide-react';


type EngagementStats = {
    id: string;
    locationName: string;
    favorites: number;
    itineraries: number;
};

type Props = {
    establishments: LocationType[];
};

function getFakeStats(establishments: LocationType[]): EngagementStats[] {
    //  stats fictives pour chaque établissement actuellement 
    return establishments.map(e => ({
        id: e.id,
        locationName: e.locationName,
        favorites: 40,
        itineraries: 15,
    }));
}

const EngagementStatsCard: React.FC<Props> = ({ establishments }) => {
    const maxDisplay = 3;
    const stats = getFakeStats(establishments);
    const displayed = stats.slice(0, maxDisplay);

    return (
        <div className="border border-gray-300 rounded-lg py-6 px-8 shadow mb-8 h-[220px]">
            <div className="flex items-center gap-2 mb-4">
                <ChartNoAxesCombined size={24} className="text-violet-600" />
                <h2 className="text-xl font-semibold">Statistiques d’engagement</h2>
            </div>
            <ul className="mb-4 mt-6">
                {displayed.map(stat => (
                    <li key={stat.id} className="flex items-center mb-2">
                        <span className="w-1/2">{stat.locationName}</span>
                        <span className="grid grid-cols-2 gap-x-4 w-1/2">
                            <span className="text-violet-700 flex gap-1 items-center">
                                <Heart size={16} />
                                Favoris : <b>{stat.favorites}</b>
                            </span>
                            <span className="text-violet-700 flex gap-1 items-center">
                                <Map size={16} />
                                Itinéraires : <b>{stat.itineraries}</b>
                            </span>
                        </span>
                    </li>
                ))}
            </ul>
            {stats.length > maxDisplay && (
                <div className="flex justify-end">
                    <Link href="/dashboard/location" className="text-violet-600 hover:underline">
                        Voir tout
                    </Link>
                </div>
            )}
        </div>
    );
};

export default EngagementStatsCard;
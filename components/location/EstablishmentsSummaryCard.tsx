import Link from "next/link";
import { LocationType } from "@/types/types";
import { Building2 } from 'lucide-react';

type Props = {
  establishments: LocationType[];
};

const EstablishmentsSummaryCard: React.FC<Props> = ({ establishments }) => {
    const maxDisplay = 3;
    const displayed = establishments.slice(0, maxDisplay);

    return (
        <div className="border border-gray-300 rounded-lg py-6 px-8 shadow relative max-h-[220px]">
            <div className="flex justify-between items-center mb-4">
                 <div className="flex items-center gap-2 ">
                    <Building2 size={24} className="text-violet-600" />
                    <h2 className="text-xl font-semibold">Mes établissements</h2>
                 </div>
                <Link href="/dashboard/location/new-location" className="bg-violet-600 text-white py-2 px-4 rounded hover:bg-violet-700">
                    Ajouter un établissement
                </Link>
            </div>
            <p className="mb-4">Total : <span className="font-bold">{establishments.length}</span></p>
            <ul className="mb-4">
                {displayed.map(e => (
                    <li key={e.id} className="flex justify-between items-center mb-2">
                    <span>{e.locationName} – {e.city}</span>
                    <Link href={`/dashboard/location/${e.id}`} className="text-violet-600 hover:underline">Voir</Link>
                    </li>
                ))}
            </ul>
            <div className="flex justify-end items-center">
                {establishments.length > maxDisplay && (
                    <Link href="/dashboard/location" className="text-violet-600 hover:underline">
                        Voir tout
                    </Link>
                )}
            </div>
        </div>
    );  
};

export default EstablishmentsSummaryCard;
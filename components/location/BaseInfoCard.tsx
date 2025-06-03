import Link from "next/link";
import { BadgeCheck, FileText, MapPin, Building, Mail, Phone, Globe } from 'lucide-react';
import { LocationType } from "@/types/types";


const BaseInfoCard = ({ location }: { location: LocationType }) => {
  return (
    <div className="border border-gray-300 rounded-lg py-6 px-8 shadow mb-8">
        <h2 className="text-xl font-semibold mb-6">Informations générales</h2>
        <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
                <BadgeCheck size={18} className="text-violet-500" />
                <span><strong>Nom :</strong> {location.locationName}</span>
            </li>

            <li className="flex items-center gap-2">
                <MapPin size={18} className="text-violet-500" />
                <span><strong>Adresse :</strong> {location.address}</span>
            </li>

            <li className="flex items-center gap-2">
                <Building size={18} className="text-violet-500" />
                <span><strong>Ville :</strong> {location.city}</span>
            </li>

            <li className="flex items-center gap-2">
                <Mail size={18} className="text-violet-500" />
                <span><strong>Code postal :</strong> {location.zipcode}</span>
            </li>

            <li className="flex items-center gap-2">
                <Phone size={18} className="text-violet-500" />
                <span><strong>Téléphone :</strong> {location.phoneNumber}</span>
            </li>

            <li className="flex items-center gap-2">
                <Globe size={18} className="text-violet-500" />
                <span><strong>Site web :</strong> {location.website}</span>
            </li>
            <li className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <FileText size={18} className="text-violet-500 flex-shrink-0" />
                    <strong>Description :</strong>
                </div>
                <p className="text-gray-700">{location.description}</p>
            </li>
        </ul>

      <div className="mt-6 flex justify-end">
        <Link href={`/dashboard/location/${location.id}/edit-basic`} className="bg-violet-600 text-white py-2 px-4 rounded hover:bg-violet-700">
          Modifier
        </Link>
      </div>
    </div>
  );
};

export default BaseInfoCard;

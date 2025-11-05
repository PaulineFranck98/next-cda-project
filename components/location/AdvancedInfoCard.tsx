import Link from "next/link";
import Image from "next/image";
import { LocationType } from "@/types/types";
import { Activity, Clock, BadgeDollarSign, Sofa, Flame, Tags, Users, Images } from 'lucide-react';


const AdvancedInfoCard = ({ location }: { location: LocationType }) => {
  return (
    <div className="border border-gray-300 rounded-lg py-6 px-8 shadow">
        <h2 className="text-xl font-semibold mb-6">Informations détaillées</h2>
        <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
                <Activity size={18} className="text-violet-500" />
                <span><strong>Type :</strong> {location.type?.typeName ?? "Non complété"}</span>
            </li>

            <li className="flex items-center gap-2">
                <Clock size={18} className="text-violet-500" />
                <span><strong>Durée :</strong> {location.duration?.onSiteTime ?? "Non complété"}</span>
            </li>

            <li className="flex items-center gap-2">
                <BadgeDollarSign size={18} className="text-violet-500" />
                {location.minPrice && location.maxPrice  ? (
                    <span><strong>Prix :</strong> {location.minPrice} € - {location.maxPrice} €</span>
                ): (
                    <span><strong>Prix :</strong> Non complété</span>
                )}
            </li>

            <li className="flex items-center gap-2">
                <Sofa size={18} className="text-violet-500" />
                <span><strong>Confort :</strong> {location.confort?.confortLevel ?? "Non complété"}</span>
            </li>

            <li className="flex items-center gap-2">
                <Flame size={18} className="text-violet-500" />
                <span><strong>Intensité :</strong> {location.intensity?.intensityLevel ?? "Non complété"}</span>
            </li>

            <li className="flex items-center gap-2">
                <Tags size={18} className="text-violet-500" />
                <span>
                    <strong>Thèmes :</strong> {location.themes && location.themes.length > 0
                    ? location.themes.map((theme) => theme.theme?.themeName).join(", ")
                    : "Non complété"}
                </span>
            </li>

            <li className="flex items-center gap-2">
                <Users size={18} className="text-violet-500" />
                <span><strong>Compagnons :</strong> {location.companions?.length > 0
                    ? location.companions.map((companion) => companion.companion?.companionName).join(", ")
                    : "Non complété"}
                </span>
            </li>
        </ul>
              <div className="mt-6">
        <div className="flex items-center gap-2 mb-2">
          <Images size={18} className="text-violet-600" />
          <h3 className="text-lg font-semibold">Images</h3>
        </div>

       {location.images?.length > 0 ? (
        <div className="flex flex-wrap gap-3">
            {location.images.map((image) => (
                <div key={image.id} className="relative w-[110px] h-[110px] overflow-hidden rounded-lg border border-gray-200" >
                    <Image src={image.imageName} alt="Image du lieu" fill  className="object-cover" />
                </div>
            ))}
        </div>
        ) : (
        <p className="text-gray-500">Aucune image.</p>
        )}
        </div>

      <div className="mt-6 flex justify-end">
        <Link href={`/dashboard/location/${location.id}/complete-location`} className="bg-violet-600 text-white py-2 px-4 rounded hover:bg-violet-700">
          Compléter / Modifier
        </Link>
      </div>
    </div>
  );
};

export default AdvancedInfoCard;

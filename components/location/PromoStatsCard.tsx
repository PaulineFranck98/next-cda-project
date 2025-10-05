import Link from "next/link";
import { LocationType } from "@/types/types";
import { formatDate } from "@/lib/utils/utils";
import { BadgePercent } from 'lucide-react';

type Props = {
  establishments: LocationType[];
};

const PromoStatsCard: React.FC<Props> = ({ establishments }) => {
    const maxDisplay = 2;
    const displayed = establishments.slice(0, maxDisplay);

    return (
        <div className="border border-gray-300 rounded-lg py-6 px-8 shadow max-h-[220px]">
            <div className="flex items-center gap-2 mb-4">
                <BadgePercent size={24} className="text-violet-600" />
            <h2 className="text-xl font-semibold">Codes promo</h2>
            </div>
            <ul className="mb-4">
            {displayed.map(e => {
                const activePromo = e.discounts?.find(discount => discount.isActive);
                return (
                <li key={e.id} className="flex justify-between items-center mb-4">
                    <div>
                    <div className="font-semibold">{e.locationName}</div>
                    {activePromo ? (
                        <div className="flex gap-3">
                            <span className="text-violet-600">
                                <b>{activePromo.percentage}%</b>
                            </span>
                            <span className="text-gray-500">
                                <b>{formatDate(activePromo.startDate)}</b> –{" "}
                                <b>{formatDate(activePromo.endDate)}</b>
                            </span>
                        </div>
                    ) : (
                        <span className="text-gray-500">
                            Aucun code promo en cours
                        </span>
                    )}
                    </div>
                    <Link
                        href={`/dashboard/location/${e.id}#discount-section`}
                        className="text-violet-600 hover:underline ml-2 whitespace-nowrap"
                    >
                        Voir
                    </Link>
                </li>
                );
            })}
            </ul>
            {establishments.length > maxDisplay && (
            <div className="flex justify-end">
                <Link  href="/dashboard/location" className="text-violet-600 hover:underline">
                    Voir tout
                </Link>
            </div>
            )}
        </div>
    );
};

export default PromoStatsCard;
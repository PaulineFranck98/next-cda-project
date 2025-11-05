import BaseInfoCard from './BaseInfoCard';
import AdvancedInfoCard from './AdvancedInfoCard';
import DiscountCard from './DiscountCard';
import { LocationType } from '@/types/types';
import { calculateCompletion } from '@/lib/utils/location-completion';
import ProgressBar from '../ui/progress-bar';
import DangerZone from './LocationDangerZone';
import { cn } from "@/lib/utils/utils";
import { AlertTriangle } from "lucide-react";

interface LocationDetailProps {
  location: LocationType | null;

}

const LocationDetail = ({ location }: LocationDetailProps) => {
    if (!location) return null;

    const completion = calculateCompletion(location);
    const isInactive = location.isActive === false;

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-8 relative">
            {isInactive && (
                <div className="bg-amber-50 border-l-4 border-amber-400 text-amber-800 p-4 mb-6 rounded-md shadow-sm flex items-start gap-3  relative">
                    <AlertTriangle className="w-6 h-6 flex-shrink-0 text-amber-500" />
                    <div>
                        <p className="font-semibold text-sm">Établissement désactivé</p>
                        <p className="text-sm">
                            Votre établissement n’est actuellement <strong>pas visible sur le site</strong>.
                            <br />
                            Pour le réactiver, veuillez <strong>renouveler votre abonnement</strong>.
                        </p>
                    </div>
                </div>
            )}

            <div className={cn("space-y-8 relative transition-opacity duration-300", isInactive && "opacity-60 pointer-events-none select-none")}>
                <div className="space-y-2">
                    <h2 className="text-md font-semibold"> Vous avez complété {completion}% des informations</h2>
                    <ProgressBar completion={completion} />
                </div>

                <BaseInfoCard location={location} />
                <AdvancedInfoCard location={location} />
                <div id="discount-section">
                    <DiscountCard discounts={location.discounts} locationId={location.id} isActive={location.isActive} />
                </div>
            </div>


            <div className="pt-4">
                <DangerZone locationId={location.id} />
            </div>
        </div>
    );
};

export default LocationDetail;

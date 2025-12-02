import React from "react";
import { CalendarCheck2 } from 'lucide-react';

interface SubscriptionStatusCardProps {
    renewalDate: string;
    compact?: boolean;
}

const getStatusClass = (daysLeft: number) => {
    if (daysLeft > 5) return "bg-[#c9ffe0] text-[#1f8e4d] border-[#bff1d3]";
    if (daysLeft > 0) return "bg-[#fdead8] text-orange-600";
    return "bg-[#ffdbdb] text-red-600";
};

const SubscriptionStatusCard: React.FC<SubscriptionStatusCardProps> = ({ renewalDate, compact }) => {
    const today = new Date();
    const renewal = new Date(renewalDate);
    const daysLeft = Math.ceil((renewal.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const statusClass = getStatusClass(daysLeft);

    if (compact) {
        return (
            <button className={`flex items-center px-3 py-1 rounded-lg mx-4 cursor-pointer ${statusClass}`}>
                <CalendarCheck2 className="mr-2" size={18} />
                <span className="font-semibold">
                    {daysLeft > 0 ? `${daysLeft} jours` :
                        daysLeft === 1 ? `${daysLeft} jour` : "Expiré"}
                </span>
            </button>
        );
    }

    return (
        <button className={`w-full flex items-center px-3 py-1 rounded-md mb-4 cursor-pointer ${statusClass}`}>
            <CalendarCheck2 className="mr-2" size={18} />
            <span className="font-semibold">
                {daysLeft > 0 ? `${daysLeft} jours restants` :
                    daysLeft === 1 ? `${daysLeft} jour restant` : "Expiré"}
            </span>
        </button>

    );
};

export default SubscriptionStatusCard;

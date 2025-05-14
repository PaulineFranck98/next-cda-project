import React from "react";
import { Duration } from '@prisma/client';

interface Props {
    durations: Duration[];
    selectedDurationId: string;
    onChange: (id:string) => void;
}

const formatDurationLabel = (duration: Duration) => {
    const { onSiteTime } = duration;
    switch(onSiteTime) {
        case 1:
            return 'Environ 1h';
        case 2:
            return 'Environ 2h';
        case 3: 
            return 'Environ 3h';
        case 12:
            return 'Environ une demi-journée';
        case 24:
            return 'Environ une journée ou plus';
        default:
            return `${onSiteTime}h estimées`;
    }
};

const DurationSelector: React.FC<Props> = ({ durations, selectedDurationId, onChange }) => {
    return (
        <div>
            <label htmlFor="duration" className="block mb-1 font-medium">
                Combien de temps en moyenne les clients restent dans votre établissement ?
            </label>
            <select
                id="duration"
                value={selectedDurationId}
                onChange={(e) => onChange(e.target.value)}
                className="border  border-gray-300 p-2 rounded w-full cursor-pointer"
            >
                <option value="">Sélectionner une durée</option>
                {durations.map((duration) => (
                    <option key={duration.id} value={duration.id}>
                        {formatDurationLabel(duration)}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default DurationSelector;
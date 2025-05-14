import React from "react";
import { Intensity } from "@prisma/client";

interface Props {
    intensities: Intensity[];
    selectedIntensityId: string;
    onChange: (id: string) => void;
}

const IntensitySelector: React.FC<Props> = ({ intensities, selectedIntensityId, onChange}) => {
    return(
        <div>
            <label htmlFor="intensity" className="block mb-1 font-medium">Niveau d'intensité</label>
            <select 
                id="intensity"
                value={selectedIntensityId}
                onChange={(e) => onChange(e.target.value)}
                className="border p-2 rounded w-full"
            >
                <option value="">Sélectionner un niveau d'intensité</option>
                {intensities.map((intensity) => (
                    <option key={intensity.id} value={intensity.id}>
                        {intensity.intensityLevel}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default IntensitySelector;
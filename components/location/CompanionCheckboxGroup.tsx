import React from "react";
import { Companion } from "@prisma/client";

interface Props {
    companions: Companion[];
    selectedCompanionIds: string[];
    onChange: (ids: string[]) => void;
}

const CompanionCheckboxGroup: React.FC<Props> = ({ companions, selectedCompanionIds, onChange }) => {
    
    const handleToggle = (id: string) => {
        if(selectedCompanionIds.includes(id)) {
            onChange(selectedCompanionIds.filter(companionId => companionId !== id));
        } else {
            onChange([...selectedCompanionIds, id]);
        }
    };

    return (
        <div>
            {/* TODO : change name */}
            <label className="block mb-1 font-medium">Pour qui ?</label> 
            <div className="grid grid-cols-2 gap-2">
                {companions.map(companion => (
                    <label key={companion.id} className="flex items-center gap-2">
                        <input 
                            type="checkbox"
                            value={companion.id}
                            checked={selectedCompanionIds.includes(companion.id)}
                            onChange={() => handleToggle(companion.id)} 
                            className="cursor-pointer accent-violet-700"
                        />
                        {companion.companionName}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default CompanionCheckboxGroup;
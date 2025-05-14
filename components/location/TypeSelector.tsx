import React from "react";
import { Type } from "@prisma/client";

interface Props {
    types: Type[];
    selectedTypeId: string;
    onChange: (id: string) => void;
}

const TypeSelector: React.FC<Props> = ({ types, selectedTypeId, onChange}) => {
    return(
        <div>
            <label htmlFor="type" className="block mb-1 font-medium">Type de lieu</label>
            <select 
                id="type"
                value={selectedTypeId}
                onChange={(e) => onChange(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full cursor-pointer"
            >
                <option value="">Sélectionner un type</option>
                {types.map((type) => (
                    <option key={type.id} value={type.id}>
                        {type.typeName}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default TypeSelector;
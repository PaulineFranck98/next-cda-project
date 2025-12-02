import React from "react";
import { Confort } from "@prisma/client";

interface Props {
    conforts: Confort[];
    selectedConfortId: string;
    onChange: (id: string) => void;
}

const ConfortSelector: React.FC<Props> = ({ conforts, selectedConfortId, onChange }) => {
    return (
        <div>
            <label htmlFor="confort" className="block mb-1 font-medium">Niveau de confort</label>
            <select
                id="confort"
                value={selectedConfortId}
                onChange={(e) => onChange(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full cursor-pointer"
            >
                <option value="">Sélectionner un niveau de confort</option>
                {conforts.map((confort) => (
                    <option key={confort.id} value={confort.id}>
                        {confort.confortLevel}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default ConfortSelector;
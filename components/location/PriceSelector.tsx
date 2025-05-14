import React from "react";
import { Price } from "@prisma/client";

interface Props {
    prices: Price[];
    selectedPriceId: string;
    onChange: (id: string) => void;
}

const PriceSelector: React.FC<Props> = ({ prices, selectedPriceId, onChange}) => {
    return(
        <div>
            <label htmlFor="price" className="block mb-1 font-medium">Fourchette de prix</label>
            <select 
                id="price"
                value={selectedPriceId}
                onChange={(e) => onChange(e.target.value)}
                className="border p-2 rounded w-full"
            >
                <option value="">Sélectionner un prix moyen</option>
                {prices.map((price) => (
                    <option key={price.id} value={price.id}>
                        {price.priceRange}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default PriceSelector;
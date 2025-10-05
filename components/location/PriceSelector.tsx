import React from "react";

interface Props {
   minPrice: number | "";
   maxPrice: number | "";
   onChange: (field:"minPrice" | "maxPrice", value: number | "") => void;

}

const PriceSelector: React.FC<Props> = ({ minPrice, maxPrice, onChange}) => {

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value ? Number(e.target.value) : "";
        onChange("minPrice", value);
    };

      const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value ? Number(e.target.value) : "";
        onChange("maxPrice", value);
    };


    return(
        <div>
            <label className="block mb-1 font-medium">Fourchette de prix (€)</label>
            <div className="flex gap-3">
                <div className="flex-1">
                <input
                    type="number"
                    min={0}
                    value={minPrice}
                    onChange={handleMinChange}
                    placeholder="Prix min"
                    className="border border-gray-300 p-2 rounded w-full"
                />
                </div>

                <div className="flex-1">
                <input
                    type="number"
                    min={0}
                    value={maxPrice}
                    onChange={handleMaxChange}
                    placeholder="Prix max"
                    className="border border-gray-300 p-2 rounded w-full"
                />
                </div>
            </div>

            {minPrice !== "" && maxPrice !== "" && minPrice > maxPrice && (
                <p className="text-red-600 text-sm mt-1">
                    Le prix minimum ne peut pas dépasser le prix maximum.
                </p>
            )}
        </div>
    )
}

export default PriceSelector;
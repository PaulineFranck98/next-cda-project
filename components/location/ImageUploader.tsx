'use client'

import React, { useState } from 'react';

interface Props {
    locationId: string;
    initialImages?: string[]; // images déjà existantes
    onImagesUpdated?: (images: string[]) => void; // callback pour le parent
}

const ImageUploader: React.FC<Props> = ({ locationId, initialImages = [], onImagesUpdated }) => {
const [selectedImages, setSelectedImages] = useState<string[]>(initialImages);


const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if(!files || files.length == 0) return;

    const newFileArray = Array.from(files);
    const previews = newFileArray.map((file) => URL.createObjectURL(file));
  
    const updatedImages = [...selectedImages, ...previews];
    setSelectedImages(updatedImages);
    onImagesUpdated?.(updatedImages);
    
};

// suppression cloudinary et bdd
const handleRemove = async (imageUrl: string) => {
    const updated = selectedImages.filter(img => img !== imageUrl);

    setSelectedImages(updated);
    onImagesUpdated?.(updated);
    
};

return (
    <div className="mb-4">
        <label className="block mb-2 font-medium">Ajouter des images</label>
        <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="mb-4"
        />

        <div className="grid grid-cols-3 gap-4">
            {selectedImages.map((url, index) => (
                <div key={index} className="relative">
                <img
                    src={url}
                    alt={`Image ${index + 1}`}
                    className="w-full h-auto rounded shadow"
                />
                <button
                    type="button"
                    onClick={() => handleRemove(url)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs"
                >
                    ✕
                </button>
                </div>
            ))}
        </div>
    </div>
    );
};

export default ImageUploader;
'use client'

import React, { useState, useEffect } from 'react';

interface Props {
	locationId: string;
	initialImages?: string[]; // images déjà existantes
	onImagesUpdated?: (images: string[]) => void; // callback pour le parent
	onImagesDeleted?: (images: string[]) => void;
}

const ImageUploader: React.FC<Props> = ({ locationId, initialImages = [], onImagesUpdated, onImagesDeleted }) => {
	const [selectedImages, setSelectedImages] = useState<string[]>(initialImages);
	const [deletedImages, setDeletedImages] = useState<string[]>([]);

	useEffect(() => {
		setSelectedImages(initialImages);
	}, [initialImages]);


	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

		const files = e.target.files;
		if (!files || files.length === 0) return;

		const formData = new FormData();
		formData.append("locationId", locationId);
		for (let i = 0; i < files.length; i++) {
			formData.append("images", files[i]);
		}

		try {
			const response = await fetch("/api/image/upload", {
				method: "POST",
				body: formData,
			});

			if (response.ok) {
				const result = await response.json();
				const updatedImages = [...selectedImages, ...result.uploaded];

				setSelectedImages(updatedImages);
				onImagesUpdated?.(updatedImages);
			} else {
				const errorText = await response.text();
				console.error("Erreur upload: ", errorText);
			}
		} catch (error) {
			console.error("Erreur lors de l'upload: ", error);
		}

	};


	const handleRemove = async (imageUrl: string) => {
		const updated = selectedImages.filter((img) => img !== imageUrl);
		setSelectedImages(updated);
		onImagesUpdated?.(updated);

		if (initialImages.includes(imageUrl)) {
			const updatedDeleted = [...deletedImages, imageUrl];
			setDeletedImages(updatedDeleted);
			onImagesDeleted?.(updatedDeleted);
		}
	};


	return (
		<div className="mb-4">
			<label className="block mb-2 font-medium">Ajouter des images</label>
			<input
				type="file"
				accept="image/*"
				multiple
				onChange={handleFileChange}
				className="bg-gray-100 rounded-md border-gray-300 border-1 mb-4 px-2 py-1 cursor-pointer hover:bg-gray-300 transition-all ease-in-out duration-300"
			/>

			<div className="grid grid-cols-3 gap-4">
				{selectedImages.map((url, index) => (
					<div key={index} className="relative">
						<img src={url} alt={`Image ${index + 1}`} className="w-full h-auto rounded shadow" />
						<button type="button" onClick={() => handleRemove(url)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs">
							✕
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default ImageUploader;
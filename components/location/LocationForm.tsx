"use client";

import React from 'react';
import AutocompleteInput from '@/components/ui/AutocompleteInput';
import { CitySuggestion } from '@/hooks/useCityAutocomplete';
import { AddressSuggestion } from '@/hooks/useAddressAutocomplete';

export type LocationFormProps = {
    locationName: string;
    description: string;
    address: string;
    latitude: string;
    longitude: string;
    city: string;
    zipcode: string;
    phoneNumber: string;
    website: string;
    isSubmitting: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    citySuggestions: CitySuggestion[];
    cityLoading: boolean;
    onCitySelect: (city: CitySuggestion) => void;
    addressSuggestions: AddressSuggestion[];
    addressLoading: boolean;
    onAddressSelect: (address: AddressSuggestion) => void;
};

const LocationForm: React.FC<LocationFormProps> = ({
    locationName,
    description,
    address,
    latitude,
    longitude,
    city,
    zipcode,
    phoneNumber,
    website,
    isSubmitting,
    onChange,
    onSubmit,
    citySuggestions,
    cityLoading,
    onCitySelect,
    addressSuggestions,
    addressLoading,
    onAddressSelect,    
}) => {
  console.log('addressSuggestions:', addressSuggestions);
  return (
    <form data-testid="location-form" onSubmit={onSubmit} className="flex flex-col gap-6 items-center">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 w-full mx-auto">
        <div className="flex flex-col gap-2">
          <label htmlFor="locationName">Nom du lieu</label>
          <input
            id="locationName"
            name="locationName"
            type="text"
            value={locationName}
            onChange={onChange}
            required
            className="bg-gray-100 rounded-md border border-gray-300 h-9 px-3"
          />
        </div>
        <div className="flex flex-col gap-2">
          <AutocompleteInput
            label="Ville"
            name="city"
            value={city}
            onChange={(e) => onChange(e)}
            suggestions={citySuggestions}
            onSelect={onCitySelect}
            loading={cityLoading}
            required
            getDisplayValue={(item) => item.name}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="zipcode">Code postal</label>
          <input
            id="zipcode"
            name="zipcode"
            type="text"
            value={zipcode}
            onChange={onChange}
            required
            className="bg-gray-100 rounded-md border border-gray-300 h-9 px-3"
          />
        </div>
        <div className="flex flex-col gap-2">
          <AutocompleteInput
            label="Adresse"
            name="address"
            value={address}
            onChange={(e) => onChange(e)}
            suggestions={addressSuggestions}
            onSelect={onAddressSelect}
            loading={addressLoading}
            required
            getDisplayValue={(item) => item.name}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phoneNumber">Numéro de téléphone</label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            value={phoneNumber}
            onChange={onChange}
            required
            className="bg-gray-100 rounded-md border border-gray-300 h-9 px-3"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="website">Site web</label>
          <input
            id="website"
            name="website"
            type="text"
            value={website}
            onChange={onChange}
            required
            className="bg-gray-100 rounded-md border border-gray-300 h-9 px-3"
          />
        </div>
        <div className="flex flex-col gap-2 lg:col-span-2">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={onChange}
            required
            rows={4}
            className="bg-gray-100 rounded-md resize-none border border-gray-300 px-3 py-2"
          />
        </div>
        <div className="">
          <label htmlFor="latitude">Latitude</label>
          <input
            id="latitude"
            name="latitude"
            type="number"
            value={latitude}
            onChange={onChange}
          />
        </div>
        <div className="">
          <label htmlFor="longitude">Longitude</label>
          <input
            id="longitude"
            name="longitude"
            type="number"
            value={longitude}
            onChange={onChange}
          />
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-violet-800 text-white px-6 py-3 rounded-md disabled:opacity-50 cursor-pointer hover:opacity-80 transition-all"
        >
          {isSubmitting ? 'Enregistrement ...' : 'Enregistrer'}
        </button>
      </div>
    </form>
  );
};

export default LocationForm;

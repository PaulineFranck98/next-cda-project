import React, { useState } from 'react';

export type AutocompleteInputProps<T> = {
	label: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	suggestions: T[];
	onSelect: (suggestion: T) => void;
	loading?: boolean;
	required?: boolean;
	placeholder?: string;
};

function AutocompleteInput<T>({
	label,
	name,
	value,
	onChange,
	suggestions = [],
	onSelect,
	loading,
	required,
	placeholder,
	getDisplayValue,
}: AutocompleteInputProps<T> & { getDisplayValue: (item: T) => string }) {
	const [showSuggestions, setShowSuggestions] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e);
		setShowSuggestions(true);
	};

	const handleSelect = (suggestion: T) => {
		onSelect(suggestion);
		setShowSuggestions(false);
	};

	return (
		<div className="flex flex-col gap-2 relative">
			<label htmlFor={name}>{label}</label>
			<input
				id={name}
				name={name}
				type="text"
				value={value}
				onChange={handleInputChange}
				required={required}
				placeholder={placeholder}
				className="bg-gray-100 rounded-md border border-gray-300 h-9 px-3"
				autoComplete="off"
			/>
			{loading && <div className="absolute top-full left-0 mt-1 text-xs text-gray-500">Chargement...</div>}
			{showSuggestions && suggestions.length > 0 && (
				<ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 z-10 max-h-48 overflow-auto">
					{suggestions.map((suggestion, index) => (
						<li
							key={index}
							className="px-3 py-2 cursor-pointer hover:bg-violet-100"
							onClick={() => handleSelect(suggestion)}
						>
							{getDisplayValue(suggestion)}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default AutocompleteInput;

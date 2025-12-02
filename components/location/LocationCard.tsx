"use client";

import React from "react";
import Link from "next/link";
import { Location } from "@prisma/client";

type LocationCardProps = {
	location: Location;
};

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {

	return (
		<div className="border border-gray-300 p-4 rounded-lg shadow hover:shadow-md transition duration-200">
			<h3 className="text-xl font-semibold mb-2">{location.locationName}</h3>
			<p className="text-gray-600 mb-4 line-clamp-2">{location.description}</p>
			<Link
				href={`/dashboard/location/${location.id}`}
				className="text-violet-600 hover:underline"
			>
				Voir les détails
			</Link>
		</div>
	);
};

export default LocationCard;

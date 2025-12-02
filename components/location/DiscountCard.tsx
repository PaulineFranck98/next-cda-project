"use client";

import { BadgePercent } from "lucide-react";
import { formatDate } from "@/lib/utils/utils";
import { DiscountType } from "@/types/types";
import { cn } from "@/lib/utils/utils";
import TailwindSwitch from "@/components/ui/switch";
import { useDiscounts } from "@/hooks/use-discounts";
import { Trash2, SquarePen } from 'lucide-react';
import Link from "next/link";

interface DiscountCardProps {
	discounts: DiscountType[];
	locationId: string;
	isActive?: boolean;
}

const DiscountCard = ({ discounts, locationId, isActive }: DiscountCardProps) => {
	const { localDiscounts, toggleDiscount } = useDiscounts(discounts);

	const disabled = !isActive;

	if (!localDiscounts || localDiscounts.length === 0) {
		return (
			<div className="border border-gray-300 rounded-lg py-6 px-8 shadow mb-8">
				<div>
					<h2 className="text-xl font-semibold mb-6">Promotions</h2>
					<p className="text-gray-700">Aucune promotion ajoutée pour cet établissement.</p>
				</div>
				<div className="mt-6 flex justify-end">
					<Link href={`/dashboard/location/${locationId}/new-discount`} className="bg-violet-600 text-white py-2 px-4 rounded hover:bg-violet-700">
						Ajouter une promotion
					</Link>
				</div>
			</div>

		);
	}

	return (
		<div className="border border-gray-300 rounded-lg py-6 px-8 shadow mb-8">
			<h2 className="text-xl font-semibold mb-6">Promotions</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{localDiscounts.map((discount) => (
					<div
						key={discount.id}
						className={cn(
							"relative rounded-md p-4 shadow-sm transition",
							discount.isActive
								? "border-2 border-violet-500 bg-violet-50"
								: "border border-gray-200 bg-white"
						)}
					>
						<div className="absolute top-2 right-2">
							<TailwindSwitch
								checked={discount.isActive}
								onChange={(checked) => !disabled && toggleDiscount(discount.id, locationId, checked)}
								disabled={disabled}
							/>
						</div>

						<div className="flex items-center gap-2 mb-2">
							<BadgePercent size={20} className="text-violet-500" />
							<span className="text-lg font-semibold">{discount.percentage}%</span>
						</div>
						<div className="mb-1 flex justify-between">
							<p><strong>Code :</strong> {discount.code}</p>

						</div>
						<div className="flex justify-between mb-1">
							<p className="text-gray-700"><strong>Début :</strong> {formatDate(new Date(discount.startDate))}</p>
							<SquarePen size={20} className="text-violet-500" />
						</div>
						<div className="flex justify-between">
							<p className="text-gray-700"><strong>Fin :</strong> {formatDate(new Date(discount.endDate))}</p>
							<Trash2 size={20} color="#ee5353" />
						</div>
					</div>
				))}
			</div>
			<div className="mt-6 flex justify-end">
				<Link href={`/dashboard/location/${locationId}/new-discount`} className="bg-violet-600 text-white py-2 px-4 rounded hover:bg-violet-700">
					Ajouter une promotion
				</Link>
			</div>
		</div>
	);
};

export default DiscountCard;

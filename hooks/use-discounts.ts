import { useState } from "react";
import { DiscountType } from "@/types/types";

export function useDiscounts(initialDiscounts: DiscountType[]) {
	const [localDiscounts, setLocalDiscounts] = useState(initialDiscounts);

	const toggleDiscount = async (discountId: string, locationId: string, checked: boolean) => {
		await fetch('/api/discount/activate', {
			method: 'PATCH',
			body: JSON.stringify({ discountId, locationId, isActive: checked }),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const updatedDiscounts = localDiscounts.map((discount) => {
			if (checked) {
				return {
					...discount,
					isActive: discount.id === discountId,
				};
			} else {
				if (discount.id === discountId) {
					return {
						...discount,
						isActive: false,
					};
				}
			return discount;
			}
		});

    	setLocalDiscounts(updatedDiscounts);
  	};

	return {
		localDiscounts,
		toggleDiscount,
	};
}

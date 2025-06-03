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

    const updatedDiscounts = localDiscounts.map((d) => {
      if (checked) {
        return {
          ...d,
          isActive: d.id === discountId,
        };
      } else {
        if (d.id === discountId) {
          return {
            ...d,
            isActive: false,
          };
        }
        return d;
      }
    });

    setLocalDiscounts(updatedDiscounts);
  };

  return {
    localDiscounts,
    toggleDiscount,
  };
}

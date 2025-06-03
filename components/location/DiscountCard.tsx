"use client";

import React from "react";
import Link from "next/link";
import { Discount } from "@prisma/client";
import { formatDate } from '@/lib/utils/utils';

type DiscountCardProps = {
  discount: Discount;
};

const DiscountCard: React.FC<DiscountCardProps> = ({ discount }) => {

  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow hover:shadow-md transition duration-200">
      <h3 className="text-xl font-semibold mb-2">Réduction</h3>
        <p>Date de début : {formatDate(discount.startDate)}</p>
        <p>Date de fin : {formatDate(discount.endDate)}</p>
        <p>Pourcentage : {discount.percentage}%</p>
        <p>Code promotionnel : {discount.code}</p>
      <Link
        href={`/dashboard/location/discount/${discount.id}`}
        className="text-violet-600 hover:underline"
      >
        Voir les détails
      </Link>
    </div>
  );
};

export default DiscountCard;
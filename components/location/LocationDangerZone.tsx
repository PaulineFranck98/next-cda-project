"use client";

import { BadgePercent } from "lucide-react";
import { formatDate } from "@/lib/utils/utils";
import { DiscountType } from "@/types/types";
import { cn } from "@/lib/utils/utils";
import TailwindSwitch from "@/components/ui/switch";
import { useDiscounts } from "@/hooks/use-discounts";
import Link from "next/link";

interface DangerZoneProps {
  locationId: string;
}

const DangerZone= ({ locationId }: DangerZoneProps) => {
  

  return (
    <div className="border border-gray-300 rounded-lg py-6 px-8 shadow mb-8 flex">
      <h2 className="text-xl font-semibold mb-6">Zone de danger</h2>
       <div className="mt-6 ">
        <Link href={`/dashboard/location/${locationId}/new-discount`} className="bg-violet-600 text-white py-2 px-4 rounded hover:bg-violet-700">
            Supprimer l'établissement
        </Link>
      </div>
    </div>
  );
};

export default DangerZone;

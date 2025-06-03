"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useLoading } from "@/context/LoadingContext";

import DiscountDetail from "@/components/location/DiscountDetail";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator} from "@/components/ui/breadcrumb";
import { DiscountType } from "@/types/types";



export default function DiscountDetailPage() {
  const params = useParams();
  const { setLoading } = useLoading();

  const [discount, setDiscount] = useState<DiscountType | null>(null);

  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/discount/${params.discountId}`);
        const data: DiscountType = await response.json();
        setDiscount(data);
      } catch (error) {
          console.error("Error fetching discount:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.discountId) {
      fetchDiscount();
    }
  }, [params.discountId, setLoading]);

  return (
    // TODO : revoir le title
    <ContentLayout title={"Réduction"}>  
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard/location">Mes établissements</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
               Réduction
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-6">
        <DiscountDetail discount={discount} /> 
      </div>
    </ContentLayout>
  );
}

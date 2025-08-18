"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useLoading } from "@/context/LoadingContext";

import LocationDetail from "@/components/location/LocationDetail";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator} from "@/components/ui/breadcrumb";
import { LocationType } from "@/types/types"; 



export default function LocationDetailPage() {
  const params = useParams();
  const { setLoading } = useLoading();

  const [location, setLocation] = useState<LocationType | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/location/${params.locationId}`);
        const data: LocationType = await response.json();
        setLocation(data);
      } catch (error) {
          console.error("Error fetching location:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.locationId) {
      fetchLocation();
    }
  }, [params.locationId, setLoading]);

  useEffect(() => {
    if (location && typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash === "#discount-section") {
        // Timeout pour être sûr que le DOM est prêt
        setTimeout(() => {
          const element = document.getElementById("discount-section");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    }
  }, [location]);

  return (
    <ContentLayout title={location?.locationName ?? "Mon établissement"}>
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
              {location?.locationName ?? "Mon établissement"}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-6">
        <LocationDetail location={location} />
      </div>
    </ContentLayout>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { Location } from "@prisma/client";
import Link from "next/link";
import LocationCard from "@/components/location/LocationCard"; 
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator} from "@/components/ui/breadcrumb";
import { useLoading } from "@/context/LoadingContext";


const LocationsListPage = () => {

  const { setLoading } = useLoading();
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {

      const fetchLocations = async () => {
        try{
          setLoading(true);
          const response = await fetch("/api/location");
          const data = await response.json();
          setLocations(data);
        } catch(error) {
          console.error("Erro fetching locations:", location);
        } finally {
          setLoading(false);
        }          
    };

    fetchLocations();
  }, [setLoading]);

  return (
    <ContentLayout title="Liste des établissements">
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
            <BreadcrumbPage>Liste des établissements</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {locations.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
    </ContentLayout>
  );
};

export default LocationsListPage;

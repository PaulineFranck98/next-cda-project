"use client";

import React, { useState, useEffect } from "react";
import { Location } from "@prisma/client";
import Link from "next/link";
import LocationCard from "@/components/location/LocationCard"; 
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator} from "@/components/ui/breadcrumb";
import { useLoading } from "@/context/LoadingContext";
import { HousePlus } from 'lucide-react';


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
            console.error("Erro fetching locations:", error);
        } finally {
        setLoading(false);
        }          
    };

    fetchLocations();
  }, [setLoading]);

  return (
    <ContentLayout title="Mes établissements">
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
                    <BreadcrumbPage>Mes établissements</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        { locations.length > 0 ? (
        <>
            <div className="mt-6">
                <Link href={'/dashboard/location/new-location'} className="bg-violet-600 text-white py-2 px-4 rounded hover:bg-violet-700">
                    Ajouter un établissement
                </Link>
            </div>
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {locations.map((location) => (
                    <LocationCard key={location.id} location={location} />
                ))}
          </div>
        </>
        ) : (
            <Link href={'/dashboard/location/new-location'} className="bg-violet-600 text-white py-2 px-4 rounded hover:bg-violet-700 flex items-center gap-2  max-w-fit mt-8">
                <HousePlus /> Ajoutez votre premier établissement
            </Link>
        )}
    </ContentLayout>
    );
};

export default LocationsListPage;

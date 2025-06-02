"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import CompleteLocation from "@/components/location/CompleteLocation";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
  } from "@/components/ui/breadcrumb";

export default function CompleteLocationPage() {
  const { locationId } = useParams(); 

  
  if (!locationId || typeof locationId !== "string") {
    return <div>Invalid location ID</div>;
  }
 
  

  return (
    <ContentLayout title="Compléter l'établissement">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
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
            <BreadcrumbPage>Compléter l&apos;établissement</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-6">
        <CompleteLocation locationId={locationId}/>
      </div>
    </ContentLayout>
  );
}

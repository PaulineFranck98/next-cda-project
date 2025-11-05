"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLoading } from "@/context/LoadingContext";
import { format } from "date-fns";
import { EyeOff } from "lucide-react";

type AdminLocation = {
  id: string;
  locationName: string;
  createdAt: string;
  userId: string;
  owner?: { name: string | null };
};

export default function AdminLocationsPage() {
  const { setLoading } = useLoading();
  const [locations, setLocations] = useState<AdminLocation[]>([]);

  useEffect(() => {
    async function fetchLocations() {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/location");
        if (res.ok) {
          const data = await res.json();
          setLocations(data);
        } else {
          console.error("Unauthorized or failed to fetch.");
        }
      } catch (error) {
        console.error("[ADMIN_LOCATIONS_PAGE]", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLocations();
  }, [setLoading]);

  return (
    <ContentLayout title="Tous les établissements">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Établissements</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {locations.length === 0 ? (
        <p className="text-gray-500 mt-8">Aucun établissement trouvé.</p>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full bg-white border border-violet-200 rounded-lg shadow-sm">
            <thead className="bg-violet-50 border-b border-violet-200">
              <tr className="text-left text-violet-700 text-sm font-medium">
                <th className="py-3 px-4">Nom du lieu</th>
                <th className="py-3 px-4">Propriétaire</th>
                <th className="py-3 px-4">Créé le</th>
                <th className="py-3 px-4 text-center"></th>
              </tr>
            </thead>
            <tbody>
              {locations.map((loc) => (
                <tr key={loc.id} className="border-b hover:bg-violet-50 transition-colors" >
                  <td className="py-3 px-4 font-medium text-gray-800">
                    <Link
                      href={`/dashboard/location/${loc.id}`}
                      className="hover:text-violet-700 hover:underline"
                    >
                      {loc.locationName}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    {loc.owner?.name || "Anonyme"}
                  </td>
                  <td className="py-3 px-4 text-gray-500 text-sm">
                    {loc.createdAt
                      ? format(new Date(loc.createdAt), "dd/MM/yyyy")
                      : "—"}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button className="text-violet-700 hover:text-violet-900" title="Masquer" >
                      <EyeOff size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </ContentLayout>
  );
}

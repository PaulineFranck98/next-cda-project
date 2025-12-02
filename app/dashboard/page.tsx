"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { useSidebar } from "@/hooks/use-sidebar";
import { useLoading } from "@/context/LoadingContext";
import { LocationType } from "@/types/types";
import EstablishmentsSummaryCard from "@/components/location/EstablishmentsSummaryCard";
import EngagementStatsCard from "@/components/location/EngagementStatsCard";
import PromoStatsCard from "@/components/location/PromoStatsCard";
import EngagementBarChart from "@/components/location/EngagementBarChart";

export default function DashboardPage() {
	const sidebar = useSidebar();
	const { setLoading } = useLoading();
	const [establishments, setEstablishments] = useState<LocationType[]>([]);

	useEffect(() => {
		async function fetchEstablishments() {
			try {
				setLoading(true);
				const res = await fetch("/api/location");
				if (res.ok) {
					const data = await res.json();
					console.log("[DEBUG establishments]", data);
					setEstablishments(data);
				}
			} catch (error) {
				console.error("Error fetching establishments:", error);
			} finally {
				setLoading(false);
			}
		}

		fetchEstablishments();
	}, [setLoading]);

	const stats = establishments.map(e => ({
		locationName: e.locationName,
		favorites: 40,
		itineraries: 15,
	}));

	if (!sidebar) return null;

	return (
		<ContentLayout title="Dashboard">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href="/dashboard">Home</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Dashboard</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
				<EstablishmentsSummaryCard establishments={establishments} />
				<EngagementBarChart stats={stats.slice(0, 3)} />
				<EngagementStatsCard establishments={establishments} />
				<PromoStatsCard establishments={establishments} />
			</div>
		</ContentLayout>
	);
}
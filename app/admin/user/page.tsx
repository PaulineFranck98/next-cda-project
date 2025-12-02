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

type AdminUser = {
	id: string;
	name: string;
	email: string;
	createdAt: string;
	role: string;
	isActive: boolean | null;
};

export default function AdminUsersPage() {
	const { setLoading } = useLoading();
	const [users, setUsers] = useState<AdminUser[]>([]);

	useEffect(() => {
		async function fetchUsers() {
			try {
				setLoading(true);
				const res = await fetch("/api/admin/user");
				if (res.ok) {
					const data = await res.json();
					setUsers(data);
				}
			} catch (error) {
				console.error("[ADMIN_USERS_PAGE]", error);
			} finally {
				setLoading(false);
			}
		}
		fetchUsers();
	}, [setLoading]);

	async function toggleActivation(userId: string, activate: boolean) {
		try {
			setLoading(true);
			await fetch("/api/admin/user", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ userId, activate }),
			});

			setUsers((prev) =>
				prev.map((user) =>
					user.id === userId ? { ...user, isActive: activate } : user
				)
			);
		} catch (error) {
			console.error("[TOGGLE_ACTIVATION]", error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<ContentLayout title="Liste des utilisateurs">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href="/dashboard">Home</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Utilisateurs</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			{users.length === 0 ? (
				<p className="text-gray-500 mt-8">Aucun utilisateur trouvé.</p>
			) : (
				<div className="mt-8 overflow-x-auto">
					<table className="min-w-full bg-white border border-violet-200 rounded-lg shadow-sm">
						<thead className="bg-violet-50 border-b border-violet-200 ">
							<tr className="text-left text-violet-700 text-sm font-medium">
								<th className="py-3 px-4">Nom</th>
								<th className="py-3 px-4">Email</th>
								<th className="py-3 px-4">Rôle</th>
								<th className="py-3 px-4">Statut</th>
								<th className="py-3 px-4">Inscrit le</th>
								<th className="py-3 px-4 text-center"></th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr key={user.id} className="border-b hover:bg-violet-50 transition-colors">
									<td className="py-3 px-4 font-medium text-gray-800">{user.name}</td>
									<td className="py-3 px-4 text-gray-700">{user.email}</td>
									<td className={`py-3 px-4 ${user.role === "admin" ? "text-violet-700 font-semibold" : "text-gray-600"}`} >{user.role} </td>
									<td className="py-3 px-4">{user.isActive === null ? (
										<span className="text-gray-400 italic">—</span>
									) : user.isActive ? (
										<span className="text-green-600 font-medium">
											Actif
										</span>
									) : (
										<span className="text-red-600 font-medium">
											Inactif
										</span>
									)}
									</td>
									<td className="py-3 px-4 text-gray-500 text-sm">{format(new Date(user.createdAt), "dd/MM/yyyy")}</td>
									<td className="py-3 px-4 text-center">
										{user.isActive === null || user.role === "admin" ? (
											<span className="text-gray-400">—</span>
										) : (
											<button
												onClick={() =>
													toggleActivation(user.id, !user.isActive)
												}
												className={`inline-flex items-center gap-1 px-3 py-1 rounded text-sm font-medium ${user.isActive
														? "text-red-700 hover:text-red-900"
														: "text-green-700 hover:text-green-900"
													}`}
											>
												{user.isActive ? "Désactiver" : "Activer"}
											</button>
										)}
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

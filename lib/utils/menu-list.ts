import { Building2, CalendarCheck, CircleUser, LayoutGrid, LucideIcon, Users, Settings } from "lucide-react";

type Submenu = {
	href: string;
	label: string;
	active?: boolean;
};

type Menu = {
	href: string;
	label: string;
	active: boolean;
	icon: LucideIcon;
	submenus?: Submenu[];
};

type Group = {
	groupLabel: string;
	menus: Menu[];
};

export function getMenuList(pathname: string, isAdmin: boolean): Group[] {

	if (isAdmin) {
		return [
			{
				groupLabel: "",
				menus: [
					{
						href: "/dashboard",
						label: "Dashboard",
						icon: LayoutGrid,
						active: pathname === "/dashboard",
						submenus: [],
					},
				],
			},
			{
				groupLabel: "",
				menus: [
					{
						href: "",
						label: "Gestion",
						icon: Users,
						active: pathname.startsWith("/admin"),
						submenus: [
							{
								href: "/admin/location",
								label: "Liste des établissements",
							},
							{
								href: "/admin/user",
								label: "Liste des utilisateurs",
							},
						],
					},
					{
						href: "/admin/configuration",
						label: "Configuration",
						icon: Settings,
						active: pathname.startsWith("/admin/configuration"),
						submenus: [],
					},
				],
			},
			{
				groupLabel: "Paramètres",
				menus: [
					{
						href: "/dashboard/profile",
						label: "Profil",
						icon: CircleUser,
						active: pathname.startsWith("/dashboard/profile"),
					},
				],
			},
		];
	}


	return [
		{
			groupLabel: "",
			menus: [
				{
					href: "/dashboard",
					label: "Dashboard",
					icon: LayoutGrid,
					active: pathname === "/dashboard",
					submenus: [],
				},
			],
		},
		{
			groupLabel: "",
			menus: [
				{
					href: "",
					label: "Établissements",
					icon: Building2,
					active: pathname.startsWith("/dashboard/location"),
					submenus: [
						{
							href: "/dashboard/location",
							label: "Mes établissements",
						},
						{
							href: "/dashboard/location/new-location",
							label: "Nouvel établissement",
						},
					],
				},
				{
					href: "",
					label: "Abonnement",
					icon: CalendarCheck,
					active: pathname.startsWith("/dashboard/subscription"),
					submenus: [
						{
							href: "/subscription",
							label: "Voir l'abonnement",
						},
						{
							href: "payments",
							label: "Paiements",
						},
						{
							href: "/invoices",
							label: "Factures PDF",
						},
					],
				},
			],
		},
		{
			groupLabel: "Paramètres",
			menus: [
				{
					href: "/dashboard/profile",
					label: "Profil",
					icon: CircleUser,
					active: pathname.startsWith("/dashboard/profile"),
				},
			],
		},
	];
}

import { Building2, CalendarCheck, CircleUser, LayoutGrid, LucideIcon } from "lucide-react";

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

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          active: pathname === "/dashboard",
          submenus: []
        }
      ]
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
              label: "Mes établissements"
            },
            {
              href: "/dashboard/location/new-location",
              label: "Nouvel établissement"
            }
          ]
        },
        {
          href: "",
          label: "Abonnement",
          icon: CalendarCheck,
          active: pathname.startsWith("/dashboard/subscription"),
          submenus: [
            {
              href: "/posts",
              label: "Voir l'abonnement"
            },
            {
              href: "/posts/new",
              label: "Paiements"
            },
            {
              href: "/posts/new",
              label: "Factures PDF"
            }
          ]
        },
      ]
    },
    {
      groupLabel: "Paramètres",
      menus: [
        {
          href: "/dashboard/profile",
          label: "Profil",
          icon: CircleUser,
          active: pathname.startsWith("/dashboard/profile"),
        }
      ]
    }
  ];
}

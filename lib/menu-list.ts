import {
  Building2,
  CalendarCheck,
  CircleUser,
  LayoutGrid,
  LucideIcon
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
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
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Établissements",
          icon: Building2,
          submenus: [
            {
              href: "/posts",
              label: "Mes établissements"
            },
            {
              href: "/posts/new",
              label: "New Post"
            }
          ]
        },
        {
          href: "",
          label: "Abonnement",
          icon: CalendarCheck,
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
          label: "Profile",
          icon: CircleUser
        }
      ]
    }
  ];
}

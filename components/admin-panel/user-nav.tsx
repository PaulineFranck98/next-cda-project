"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { LayoutGrid, LogOut, User } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export function UserNav() {
  const { user } = useUser();

  const name = user?.fullName || "Utilisateur";
  const email = user?.primaryEmailAddress?.emailAddress || "–";
  const initials = name.split(" ").map((name) => name[0]).join("").toUpperCase();

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip >
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="relative h-8 w-8 rounded-full border-gray-300 "
              >
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src={user?.imageUrl || ""} alt="Avatar" />
                  <AvatarFallback className="bg-transparent">{initials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Profil</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56 bg-background border-gray-300 p-2" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
             {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/dashboard" className="flex items-center hover:bg-violet-100 hover:text-violet-800 transition-all duration-300 hover:border-violet-400 p-2 rounded-md cursor-pointer">
              <LayoutGrid className="w-4 h-4 mr-3 text-muted-foreground" />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/dashboard/profile" className="mt-2 flex items-center hover:bg-violet-100 hover:text-violet-800 transition-all duration-300 hover:border-violet-400 p-2 rounded-md cursor-pointer">
              <User className="w-4 h-4 mr-3 text-muted-foreground" />
              Profil
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem className="hover:cursor-pointer mt-2 w-full hover:bg-violet-100 hover:text-violet-800 transition-all duration-300 hover:border-violet-400 p-2 rounded cursor-pointer" asChild>
          <SignOutButton>
            <button className=" flex items-center">
              <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
              Déconnexion
            </button>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

"use client";

import Link from "next/link";

import * as Icons from "@/client/components/icons";
import { MenuButton } from "@/client/components/menu/menu-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/client/components/ui/dropdown-menu";
import { cn } from "@/client/lib/cn";
import { routes } from "@/shared/routes";

import { type User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";

export const Account = () => {
  const sesh = useSession();
  const user = sesh.data?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MenuButton>
          <Icons.User className="size-4" />
          <span className="sr-only">Account</span>
        </MenuButton>
      </DropdownMenuTrigger>
      {user ? <SignedIn user={user} /> : <NotSignedIn />}
    </DropdownMenu>
  );
};

const SignedIn = ({ user }: { user: User }) => {
  return (
    <DropdownMenuContent className="w-64" align="end">
      <DropdownMenuLabel className="truncate" title={user.email ?? undefined}>
        {user.email ?? "(unknown)"}
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link href={routes.account}>
            <Icons.Settings className="mr-2 size-4" />
            Settings
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator />

      <ThemeGroup />

      <DropdownMenuItem
        onClick={() => {
          void signOut();
        }}
      >
        <Icons.LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

const NotSignedIn = () => {
  return (
    <DropdownMenuContent className="w-40" align="end">
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link href={routes.signin}>
            <Icons.LogOut className="mr-2 h-4 w-4" />
            Sign in
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  );
};

const ThemeIcons = {
  light: Icons.Light,
  dark: Icons.Dark,
  system: Icons.System,
};

const ThemeGroup = () => {
  const { theme, setTheme } = useTheme();

  const ThemeIcon = theme
    ? ThemeIcons[theme as keyof typeof ThemeIcons]
    : ThemeIcons.system;

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <ThemeIcon className="mr-2 h-4 w-4" />
        <span>Theme</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem
            onClick={() => setTheme("dark")}
            className={cn(
              "flex gap-2 opacity-80 focus:bg-accent/60 focus:opacity-100",
              {
                "bg-accent opacity-100 focus:bg-accent": theme === "dark",
              },
            )}
          >
            <ThemeIcons.light className="mr-2 h-4 w-4" />
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme("light")}
            className={cn(
              "flex gap-2 opacity-80 focus:bg-accent/60 focus:opacity-100",
              {
                "bg-accent opacity-100 focus:bg-accent": theme === "light",
              },
            )}
          >
            <ThemeIcons.light className="mr-2 h-4 w-4" />
            Light
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setTheme("system")}
            className={cn(
              "flex gap-2 opacity-80 focus:bg-accent/60 focus:opacity-100",
              {
                "bg-accent opacity-100 focus:bg-accent": theme === "system",
              },
            )}
          >
            <ThemeIcons.system className="mr-2 h-4 w-4" />
            System
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};

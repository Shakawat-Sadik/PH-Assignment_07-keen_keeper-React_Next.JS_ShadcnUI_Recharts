"use client";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "./ui/navigation-menu";
import logo from "../assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitch from "./ThemeSwitch";
import { ChartDonutIcon, ClockAfternoonIcon, ClockClockwiseIcon, HouseLineIcon, HouseSimpleIcon } from "@phosphor-icons/react";

const Navbar = () => {
  const path = usePathname();

  return (
    <div className="sticky top-0 z-40 bg-background/70 flex flex-row w-full">
      <NavigationMenu className="flex justify-between">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Image
              loading="eager"
              src={logo}
              alt="Logo"
              width={200}
              height={80}
              className="w-auto h-auto dark:drop-shadow-[0rem_0_0.1rem_#fff] shrink-0"
            />
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuList className="flex items-center justify-center gap-4">
          <NavigationMenuItem>
            <Link
              href="/"
              className={`${path === "/" ? "bg-primary text-background hover:text-(--hover-primary) scale-105" : "hover:bg-(--hover-primary) hover:text-foreground"} flex items-center gap-2 rounded-sm p-2 font-medium transition-all duration-300 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 cursor-pointer`}
            >
              <HouseLineIcon size={16} />
              Home
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href="/timeline"
              className={`${path === "/timeline" ? "bg-primary text-background hover:text-(--hover-primary) scale-105" : "hover:bg-(--hover-primary) hover:text-foreground"} inline-flex items-center gap-2 rounded-sm p-2 font-medium transition-all duration-300 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 cursor-pointer`}
            >
              <ClockClockwiseIcon size={16} />
              Timeline
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href="/stats"
              className={`${path === "/stats" ? "bg-primary text-background hover:text-(--hover-primary) scale-105" : "hover:bg-(--hover-primary) hover:text-foreground"} inline-flex items-center gap-2 rounded-sm p-2 font-medium transition-all duration-300 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 cursor-pointer`}
            >
              <ChartDonutIcon size={16} />
              Stats
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <ThemeSwitch />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navbar;

"use client"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";
import logo from "../assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitch from "./ThemeSwitch";

const Navbar = () => {
  const path = usePathname();
  // console.log(typeof(path));
  return (
    <div className="sticky top-0 z-40 bg-background/70 flex flex-row w-full">
      <NavigationMenu className="flex justify-between">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Image loading="eager" src={logo} alt="Logo" />
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuList className="flex gap-4">
          <NavigationMenuItem>
            <Link
              href="/"
              className={`${path === "/" ? "bg-primary text-background hover:text-(--hover-primary) scale-105" : "hover:bg-(--hover-primary) hover:text-foreground"} inline-flex items-center gap-2 rounded-sm p-2 text-sm font-medium transition-all duration-300 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 cursor-pointer`}
            >
              Home
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href="/timeline"
              className={`${path === "/Timeline" ? "bg-primary text-background hover:text-(--hover-primary) scale-105" : "hover:bg-(--hover-primary) hover:text-foreground"} inline-flex items-center gap-2 rounded-sm p-2 text-sm font-medium transition-all duration-300 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 cursor-pointer`}
            >
              Timeline
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href="/Stats"
              className={`${path === "/Stats" ? "bg-primary text-background hover:text-(--hover-primary) scale-105" : "hover:bg-(--hover-primary) hover:text-foreground"} inline-flex items-center gap-2 rounded-sm p-2 text-sm font-medium transition-all duration-300 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 cursor-pointer`}
            >
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

"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import logo from "../assets/logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeSwitch from "./ThemeSwitch";

const Navbar = () => {
  const path = usePathname();
  // console.log(typeof(path));
  return (
    <div className="flex flex-row w-full">
      <NavigationMenu className="flex justify-between border">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Image loading="eager" src={logo} alt="Logo" />
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuList className="flex gap-4">
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/"
              className={`${path === "/" ? "bg-primary text-background hover:text-primary scale-115" : "hover:bg-(--hover-primary) hover:text-foreground"} transition-all duration-300 rounded-xs cursor-pointer`}
            >
              Home
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/Timeline"
              className={`${path === "/Timeline" ? "bg-primary text-background hover:text-primary scale-115" : "hover:bg-(--hover-primary) hover:text-foreground"} transition-all duration-300 rounded-xs cursor-pointer`}
            >
              Timeline
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/Stats"
              className={`${path === "/Stats" ? "bg-primary text-background hover:text-primary scale-115" : "hover:bg-(--hover-primary) hover:text-foreground"} transition-all duration-300 rounded-xs cursor-pointer`}
            >
              Stats
            </NavigationMenuLink>
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

import { cn } from "../lib/utils";
import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuList } from "./ui/navigation-menu";
import "@/styles/nav.css";
import Button1 from "./custom-ui/Button-1";
const components = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Membership",
    href: "/membership",
  },
  {
    title: "Trainers",
    href: "/trainer",
  },
  {
    title: "Supplements",
    href: "/supplement",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];
export default function Navbar() {
  return (
    <div className="navbar-wrapper p-2 bg-app_secondary ">
      <div className="navbar-container w-full flex justify-between">
        <div className="desktop-nav-links hidden md:block order-1 self-start">
          <NavigationMenu>
            <NavigationMenuList className="gap-5">
              {components.map((component) => (
                <Link
                  key={component.title}
                  to={component.href}
                  className={cn(
                    "nav-link text-sm font-medium text-app_neutral-lightGray transition-colors hover:opacity-80 p-3 group"
                  )}
                >
                  {component.title}
                </Link>
              ))}
              <Link
                to="/signup"
                className=" text-sm font-medium text-app_neutral-lightGray transition-colors hover:opacity-80 p-3 group"
              >
                <Button1 title="Sign Up" bgColor="bg-app_secondary-orange" />
              </Link>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="logo font-permanentMarker text-orange-400 font-bold text-4xl ">
          Malek's Gym
        </div>
      </div>
    </div>
  );
}

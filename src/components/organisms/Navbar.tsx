import { useNavigate } from "react-router-dom";
import type { ComponentType, SVGProps } from "react";

import type { NavbarProps, NavItems } from "../../types/navigations";

import ProfileIcon from "../../../public/assets/icons/profile.svg?react";
import StarIcon from "../../../public/assets/icons/star.svg?react";
import SignIcon from "../../../public/assets/icons/sign.svg?react";

const Navbar = ({ navItems }: NavbarProps) => {
  const navigate = useNavigate();
  const displayedNavItems: NavItems[] = navItems ?? [];

  type MenuItem = {
    label: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    onClick: () => void;
  };

  const menuItems: MenuItem[] = [
    {
      label: "Profil Saya",
      icon: ProfileIcon,
      onClick: () => navigate("/login"),
    },
    {
      label: "Ubah Premium",
      icon: StarIcon,
      onClick: () => navigate("/#"),
    },
    {
      label: "Keluar",
      icon: SignIcon,
      onClick: () => navigate("/#"),
    },
  ];

  return (
    <header className="relative z-40 shrink-0">
      <nav className="mx-auto flex h-14 w-full items-center justify-between px-8 md:h-16 md:px-12 lg:h-20 lg:px-32">
        <div className="flex items-center gap-3 md:gap-8 lg:gap-12">
          <button
            type="button"
            className="flex items-center justify-center"
            onClick={async () => navigate("/")}
          >
            <img
              src="/assets/logo/logo-full.svg"
              className="h-4 md:h-5 cursor-pointer"
              alt="Chill Logo"
            />
          </button>
          <div className="flex gap-3 md:gap-6 lg:gap-8">
            {displayedNavItems.map(({ label, onClick }) => (
              <button
                key={label}
                className="text-sm text-text-light no-underline hover:text-greyscale-400 hover:cursor-pointer md:text-base md:font-bold lg:text-lg"
                onClick={onClick}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="group relative">
          <div className="flex items-center md:gap-1 lg:gap-2">
            <button
              aria-label="Profil"
              className="h-7.5 w-7.5 overflow-hidden rounded-full md:h-9 md:w-9 lg:h-11 lg:w-11"
            >
              <img
                src="/assets/images/avatar.webp"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </button>
            <img
              src="/assets/icons/dropdown.svg"
              alt=""
              className="h-7.5 w-7.5 md:h-8 md:w-8 lg:h-10 lg:w-10"
            />
          </div>
          <div className="absolute right-0 top-full z-10 hidden w-40 rounded-b-md bg-header-background p-3 text-xs md:w-56 md:text-sm lg:text-base group-hover:block">
            {menuItems.map(({ label, icon: Icon, onClick }) => (
              <button
                key={label}
                type="button"
                className="flex w-full items-center gap-2 px-3 py-3 text-left font-bold text-white transition-colors hover:text-primary-hover"
                onClick={onClick}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

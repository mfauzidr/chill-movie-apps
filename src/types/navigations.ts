export interface NavItems {
  label: string;
  onClick: () => void;
}

export interface NavbarProps {
  navItems?: NavItems[];
}
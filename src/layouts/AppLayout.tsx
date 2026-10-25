import { Outlet } from "react-router-dom";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import { NavItems } from "../types/navigations";

const AppLayout = () => {
  const navItems: NavItems[] = [
  { label: "Home", href: "/" },
  { label: "Movies", href: "/movies" },
  { label: "Series", href: "/series" },
];

  return (
    <>
      <Navbar navItems={navItems}/>

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default AppLayout;

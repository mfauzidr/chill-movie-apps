import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import { NavItems } from "../types/navigations";

const AppLayout = () => {
  const navigate = useNavigate();

  const publicNavItems: NavItems[] = [
    { 
      label: "Series", 
      onClick: () => {} },
    { 
      label: "Film", 
      onClick: () => {} },
    {
      label: "Daftar Saya",
      onClick: () => {},
    },
    { label: "Admin", 
      onClick: () => navigate("/admin") },
  ];
  return (
    <>
      <Navbar navItems={publicNavItems} />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default AppLayout;

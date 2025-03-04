import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import AppSidebar from "./components/AppSidebar/AppSidebar";
// import { SidebarTrigger } from "./components/ui/sidebar";

export default function Layout() {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main className="">
        <Outlet />
      </main>{" "}
      <footer>
        <Footer />
      </footer>
    </>
  );
}

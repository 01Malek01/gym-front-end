import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Layout() {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Outlet />
      </main>{" "}
      <footer>
        <Footer />
      </footer>
    </>
  );
}

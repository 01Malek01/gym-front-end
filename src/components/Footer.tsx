import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Company Info */}
        <div className="space-y-4">
          <div className="logo font-permanentMarker  text-orange-400 font-bold text-4xl ">
            Malek's Gym
          </div>{" "}
          <p className="text-slate-400">
            Achieve your fitness goals with top-notch facilities, experienced
            trainers, and a community that inspires you.
          </p>
          <div className="flex gap-4 mt-3">
            <a
              href="#"
              aria-label="Facebook"
              className="text-slate-200 hover:text-blue-500"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-slate-200 hover:text-blue-400"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-slate-200 hover:text-pink-500"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="text-slate-200 hover:text-red-500"
            >
              <FaYoutube size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-slate-50">Quick Links</h3>
          <ul className="text-slate-400 space-y-2">
            <li>
              <a href="/membership" className="hover:text-white">
                Memberships
              </a>
            </li>
            <li>
              <a href="/trainers" className="hover:text-white">
                Trainers
              </a>
            </li>
            <li>
              <a href="/classes" className="hover:text-white">
                Classes
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-slate-50">Contact Us</h3>
          <p className="text-slate-400">123 Fitness Blvd, Fit City, FC 12345</p>
          <p className="text-slate-400">Email: malekmostafa0051@gmail.com</p>
          <p className="text-slate-400">Phone: +20 1125485384</p>
        </div>
      </div>

      <div className="border-t border-slate-700 mt-8 pt-4 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} Malek's Gym. All rights reserved.
      </div>
      <p className="text-center text-sm mt-5">
        Full-stack website developed by: Malek Mostafa
      </p>
    </footer>
  );
}

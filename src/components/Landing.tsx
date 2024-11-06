import { useState } from "react";
import BestMemberships from "./BestMemberships";
import { IoCloseCircleSharp } from "react-icons/io5";
import Hero from "./Hero";
import Offers from "./Offers";
import Testimonials from "./Testimonials";
import TopTrainers from "./TopTrainers";
import { motion } from "framer-motion";

export default function Landing() {
  const [isBannerVisible, setBannerVisible] = useState(true);

  return (
    <div className="landing-page-wrapper ">
      {isBannerVisible && (
        <motion.div
          className="offer-banner md:fixed top-0 left-0 w-full  z-10 relative"
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
          transition={{ delay: 4, duration: 0.5, ease: "easeInOut" }}
        >
          <span
            className="hide-banner absolute top-1 right-1 cursor-pointer text-slate-900"
            onClick={() => setBannerVisible(false)}
          >
            <IoCloseCircleSharp size={50} />
          </span>
          <Offers />
        </motion.div>
      )}

      <div className="landing-page-container flex flex-col gap-20">
        <section className="hero-section">
          <Hero />
        </section>
        <section className="best-memberships-section">
          <BestMemberships />
        </section>
        <section className="top-trainers-section">
          <TopTrainers />
        </section>
        <section className="testimonials-section">
          <Testimonials />
        </section>
        <section className="offers-section">
          <Offers />
        </section>
      </div>
    </div>
  );
}

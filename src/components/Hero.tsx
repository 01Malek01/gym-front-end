import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import videoSrc from "../assets/videos/hero-bg-video.mp4";
import Button1 from "./custom-ui/Button-1";

export default function Hero() {
  return (
    <div className="hero-wrapper relative w-full h-screen py-10 md:py-0">
      <div className="hero-bg-video -z-10 absolute w-full h-full">
        <div className="overlay absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover border border-black -z-10 "
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
      <div className="hero-container  flex flex-col gap-5 w-full h-full md:items-start md:justify-start justify-center items-center">
        <section className="hero-highlight mt-20  flex flex-col gap-5 md:items-center md:justify-start justify-center items-center   ">
          <motion.div
            initial={{ opacity: 0, x: "-100vw" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 2,
              type: "spring",
              damping: 50,
              mass: 0.7,
              stiffness: 1000,
            }}
            className="hero-headline font-bold text-8xl text-app_secondary-orange text-center italic font-poppins"
          >
            NO PAIN
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: "50vw" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 2,
              delay: 1.2,
              type: "spring",
              damping: 50,
              mass: 0.7,
              stiffness: 1000,
            }}
            className="hero-headline font-bold text-8xl text-slate-50 text-center italic md:ml-40 font-poppins"
          >
            NO GAIN
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
            className="hero-paragraph font-bold text-sm max-w-[450px] mt-8  text-slate-50/80  italic"
          >
            Unleash your potential with us! At Malek's Gym, we're dedicated to
            helping you achieve your fitness goals, whether you're just starting
            out or pushing new limits.
          </motion.div>
          <div className="flex flex-row gap-4 justify-center items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 1.5 }}
              className="cta"
            >
              <Link to={"/signup"}>
                <div
                  className="text-lg italic font-medium text-slate-50 rounded-full 
                bg-gradient-to-r from-app_secondary-brightRed to-app_secondary-coolBlue
                transition-all duration-300 ease-in-out transform hover:scale-105 
                hover:bg-gradient-to-r hover:from-app_secondary-brightRed 
                hover:to-app_secondary-crimsonRed p-5 shadow-lg"
                >
                  Join Now
                </div>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 1.5 }}
              className="cta"
            >
              <Link to={"/membership"}>
                <Button1
                  title="Browse Memberships"
                  bgColor="bg-app_neutral-graphite"
                />
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}

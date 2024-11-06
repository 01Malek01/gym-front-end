import CoachCard from "./CoachCard";
import coach1 from "../assets/images/coach1.jpeg";
import coach2 from "../assets/images/coach2.jpeg";
import coach3 from "../assets/images/coach3.jpeg";
import { motion } from "framer-motion";

export default function TopTrainers() {
  return (
    <div className="top-trainers-wrapper">
      <h1 className="top-trainers-headline text-3xl font-medium text-slate-50 text-center ">
        Top Trainers
      </h1>
      <div className="top-trainers-subheadline text-xl font-medium text-slate-50  text-center my-5  ">
        Our top trainers are ready to help you reach your goals
      </div>
      <div className="top-trainers-container flex flex-col md:flex-row gap-4 justify-center items-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
          viewport={{ once: true }}
        >
          <CoachCard
            name="John Paul"
            imgSrc={coach1}
            specialty="Bodybuilding"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <CoachCard
            name="Markus Polo"
            imgSrc={coach2}
            specialty="Bodybuilding"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.1 }}
          viewport={{ once: true }}
        >
          <CoachCard name="Alexa Smith" imgSrc={coach3} specialty="Fitness" />
        </motion.div>
      </div>
    </div>
  );
}

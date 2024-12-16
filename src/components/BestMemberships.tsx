import { motion } from "framer-motion";
import MembershipBox from "./MembershipBox";
import basic from "../assets/images/basic.jpg";
import prof from "../assets/images/prof.jpg";
import ult from "../assets/images/ult.jpg";
export default function BestMemberships() {
  return (
    <div className="best-memberships-wrapper overflow-hidden py-5">
      <div className="best-memberships-container flex flex-col gap-5 items-center justify-center">
        <h1 className="headline text-4xl text-slate-100 font-medium">
          Best Memberships
        </h1>
        <div className="best-memberships grid md:grid-cols-3 grid-cols-1 gap-5">
          {[
            { title: "Basic", imgSrc: basic },
            { title: "Premium", imgSrc: prof },
            { title: "Ultimate", imgSrc: ult },
          ].map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <MembershipBox
                title={plan.title}
                imgSrc={plan.imgSrc}
                price={index === 0 ? "10" : index === 1 ? "20" : "30"}
                desc={
                  plan.title === "Basic"
                    ? "Our Basic membership offers access to essential gym facilities and equipment, perfect for those who are just getting started on their fitness journey. Enjoy a welcoming environment with standard workout areas and basic fitness classes."
                    : plan.title === "Premium"
                    ? "The Premium membership steps it up a notch, providing access to all gym facilities, including advanced equipment and specialized group fitness classes. This tier also includes added benefits such as personal training sessions and enhanced locker room amenities."
                    : "The Ultimate membership is designed for the serious fitness enthusiast. It includes everything from the Premium level, plus exclusive access to VIP areas, priority booking for classes, additional personal training sessions, and premium amenities like spa services and wellness programs."
                }
                href="/membership"
                buttonTitle="More Details"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import useGetAllMemberships from "../hooks/api/useGetAllMemberships";
import MembershipBox from "../components/MembershipBox";
import { Membership } from "../types";
import basic from "../assets/images/basic.jpg";
import prof from "../assets/images/prof.jpg";
import ult from "../assets/images/ult.jpg";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import Loader from "../components/custom-ui/Loader";

type FAQItem = {
  question: string;
  answer: string;
};

const FAQ: React.FC<{ faq: FAQItem }> = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item border-b border-gray-700 py-4">
      <h3
        onClick={() => setIsOpen(!isOpen)}
        className="faq-question font-medium text-lg text-slate-100 cursor-pointer flex gap-5 justify-between items-center"
      >
        {faq.question}{" "}
        {isOpen ? <FaArrowUp size={20} /> : <FaArrowDown size={20} />}
      </h3>
      {isOpen && <p className="faq-answer text-slate-300 mt-2">{faq.answer}</p>}
    </div>
  );
};

export default function MembershipsPage() {
  const [membershipsState, setMembershipsState] = useState([]);
  const { memberships, isLoading } = useGetAllMemberships();

  useEffect(() => {
    if (memberships) {
      setMembershipsState(memberships);
      console.log(memberships);
    }
  }, [memberships]);

  const faqs: FAQItem[] = [
    {
      question: "What is included in each membership type?",
      answer:
        "Each membership offers unique perks tailored to your fitness goals. Basic provides essential gym access, Premium includes additional training sessions, and Ultimate offers exclusive access to VIP areas and spa services.",
    },
    {
      question: "Can I upgrade my membership?",
      answer:
        "Yes! You can upgrade your membership anytime by visiting the front desk or contacting customer service.",
    },
    {
      question: "Is there a refund policy for memberships?",
      answer:
        "Refunds are available for certain memberships within the first 7 days of purchase. Contact support for more details.",
    },
  ];

  return (
    <div className="memberships-wrapper">
      <h1 className="font-bold text-5xl text-center text-slate-100 my-5">
        Memberships
      </h1>
      {isLoading ? (
        <div className="mx-auto justify-center flex items-center">
          <Loader dimensions="h-[150px] w-[150px]" />
        </div>
      ) : (
        <div className="memberships-container grid grid-cols-1 gap-5 flex-col md:grid-cols-4 p-5">
          {membershipsState?.map((membership: Membership) => (
            <MembershipBox
              key={membership._id}
              title={membership.type}
              price={membership.price}
              desc={`Duration: ${membership.durationInDays + " Days"}`}
              buttonTitle={"Buy Membership"}
              imgSrc={
                membership.type === "basic"
                  ? basic
                  : membership.type === "premium"
                  ? prof
                  : membership.type === "ultimate"
                  ? ult
                  : ""
              }
            />
          ))}
        </div>
      )}

      {/* FAQ Section */}
      <div className="faq-section mt-10 p-5 bg-slate-800 rounded-md">
        <h2 className="text-3xl font-semibold text-slate-100 text-center mb-5">
          Frequently Asked Questions
        </h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <FAQ key={index} faq={faq} />
          ))}
        </div>
      </div>
    </div>
  );
}

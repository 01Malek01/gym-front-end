import offer from "../assets/images/offer.jpg";

function Offers() {
  return (
    <div className="offers-wrapper bg-[#136897] overflow-hidden">
      <div className="offers-container flex gap-8 justify-center items-center">
        <div className="offer-image order-1">
          <img
            src={offer}
            alt="offer"
            className="object-cover md:w-60 md:h-60 md:scale-125 hidden md:block  "
          />
        </div>
        <div className="offer-desc md:w-1/2 md:text-xl text-sm text-slate-50 text-balance">
          Kickstart your fitness journey with a limited-time{" "}
          <span className="text-orange-400 text-3xl font-bold">20%</span>{" "}
          discount for new members! Join now and unlock full access to our
          top-of-the-line equipment, expert trainers, and a supportive
          community—all designed to help you achieve your goals. Don’t miss out
          on this exclusive offer to invest in your health and wellness at an
          unbeatable price!
        </div>
      </div>
    </div>
  );
}

export default Offers;

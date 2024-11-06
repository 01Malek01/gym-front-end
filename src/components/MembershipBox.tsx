import { Link } from "react-router-dom";
import Button1 from "./custom-ui/Button-1";

type Props = {
  title: string;
  price: string;
  desc: string;
  href: string;
  buttonTitle: string;
};

export default function MembershipBox({
  title,
  price,
  desc,
  href,
  buttonTitle,
}: Props) {
  return (
    <div className="membership-box h-[500px] bg-app_primary-electricBlue flex flex-col items-center gap-6 p-15 md:p-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
      <h2 className="text-3xl font-extrabold text-slate-50 text-center">
        {title}
      </h2>
      <p className="text-6xl font-bold text-app_secondary-orange text-center">
        ${price}
      </p>
      <p className="text-lg text-slate-200 text-center tracking-wider">
        {desc}
      </p>
      <Link to={href}>
        <Button1 title={buttonTitle} bgColor="bg-app_secondary-orange" />
      </Link>
    </div>
  );
}

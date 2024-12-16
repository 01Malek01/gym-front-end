import { Link } from "react-router-dom";
import Button1 from "./custom-ui/Button-1";

type Props = {
  title: string;
  price: string;
  desc: string;
  href?: string;
  buttonTitle: string;
  imgSrc?: string;
  buttonAction?: () => void;
};

export default function MembershipBox({
  title,
  price,
  desc,
  href,
  buttonTitle,
  imgSrc,
  buttonAction,
}: Props) {
  return (
    <div className="membership-box h-[500px] bg-slate-800 flex flex-col items-center gap-6 p-15 md:p-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out relative">
      {imgSrc && (
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover -z-10 absolute top-0 left-0  opacity-20 "
        />
      )}
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

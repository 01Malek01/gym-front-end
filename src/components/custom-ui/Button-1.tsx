import { cn } from "../../lib/utils";

type Props = {
  title: string;
  bgColor: string;
};
const Button1 = ({ title, bgColor }: Props) => {
  return (
    <button
      className={cn(
        `button-1 p-2 m-1 ${bgColor} text-app_neutral-coolGray rounded-md shadow-md hover:opacity-80 transition-all duration-300 ease-in-out`
      )}
    >
      {title}
    </button>
  );
};

export default Button1;

import { cn } from "../../lib/utils";

type Props = {
  title: string;
  bgColor: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};
const Button1 = ({ title, bgColor, type, disabled }: Props) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={cn(
        `button-1 p-2 m-1 ${bgColor} text-app_neutral-coolGray rounded-md shadow-md hover:opacity-80 transition-all duration-300 ease-in-out`
      )}
    >
      {title}
    </button>
  );
};

export default Button1;

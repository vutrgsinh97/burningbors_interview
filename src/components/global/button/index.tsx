import { cn } from "@/libs/utils";
import { Button } from "antd";
import { FC, ReactNode } from "react";

interface IMyButton {
  children: ReactNode;
  classname?: string;
  hiddenBorder?: boolean;
  type?: "link" | "text" | "default" | "primary" | "dashed",
  size?: "small" | "middle" | "large" ,
  disabled?: boolean;
  onClick?: () => void;
}

const MyButton: FC<IMyButton> = ({
  children,
  classname,
  hiddenBorder = false,
  type = "default",
  size = "middle",
  disabled = false,
  onClick
}) => {
  return (
    <Button
      type={type}
      size={size}
      disabled={disabled}
      onClick={onClick && onClick}
      className={cn(hiddenBorder && "border-none! shadow-none!", classname)}
    >
      {children}
    </Button>
  );
};

export default MyButton;

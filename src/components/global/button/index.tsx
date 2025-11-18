import { cn } from "@/libs/utils";
import { Button } from "antd";
import { FC, ReactNode } from "react";

interface IMyButton {
  children: ReactNode;
  classname?: string;
  hiddenBorder?: boolean;
  type?: "link" | "text" | "default" | "primary" | "dashed";
  size?: "small" | "middle" | "large";
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  htmlType?: "button" | "submit" | "reset";
  loading?: boolean;
  danger?: boolean;
}

const MyButton: FC<IMyButton> = ({
  children,
  classname,
  hiddenBorder = false,
  type = "default",
  size = "middle",
  disabled = false,
  onClick,
  htmlType,
  loading = false,
  danger = false
}) => {
  return (
    <Button
      type={type}
      size={size}
      disabled={disabled}
      onClick={onClick}
      htmlType={htmlType}
      loading={loading}
      danger={danger}
      className={cn(hiddenBorder && "border-none! shadow-none!", classname)}
    >
      {children}
    </Button>
  );
};

export default MyButton;

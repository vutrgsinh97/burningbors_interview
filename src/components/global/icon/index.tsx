import { cn } from "@/libs/utils";
import { Image } from "antd";
import { FC } from "react";

type IName = "bag" | "user" | "star" | "eye" | "logout" | "total" | "totalDiscount" | "package" | "trashFilled" | "plus" | "minus";

interface IMyIcon {
  name: IName;
  size?: number;
  alt?: string;
  preview?: boolean;
  classname?: string;
  imgClass?: string
}

const iconsMap: Record<IMyIcon["name"], string> = {
  bag: "icons/shopping-bag.png",
  user: "icons/user-square-rounded.png",
  star: "icons/star.png",
  eye: "icons/eye.png",
  logout: "icons/logout.png",
  total: "icons/total.png",
  totalDiscount: "icons/total-discount.png",
  package: "icons/package.png",
  trashFilled: "icons/trash_filled.png",
  plus: "icons/plus.png",
  minus: "icons/minus.png"
};

const MyIcon: FC<IMyIcon> = ({
  name,
  size = 26,
  alt,
  preview = false,
  classname,
  imgClass
}) => {
  const src = iconsMap[name];
  if (!src) return null;

  return (
    <div className={cn("shrink-0 flex items-center", classname)}>
      <Image
        src={src}
        preview={preview}
        alt={alt || `icon-${name}`}
        width={size}
        height={size}
        className={imgClass}
      />
    </div>
  );
};

export default MyIcon;

import { Image } from "antd";
import { FC, ReactElement } from "react";

type TProps = {
  title?: string;
  description?: string;
  extra?: ReactElement;
};

const NotFound: FC<TProps> = ({ title, description, extra }) => {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden items-center justify-center mt-[5vh]">
      <Image src="/icons/not-found.png" alt="Not-found" width={256} preview={false} />
      {title && <div className="text-xl text-gray-500 capitalize">{title}</div>}
      {description && <div>{description}</div>}
      {extra && <>{extra}</>}
    </div>
  );
};

export default NotFound;

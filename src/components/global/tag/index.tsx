import { cn } from "@/libs/utils";
import { Tag } from "antd";
import { FC } from "react";
import styles from "./tag.module.scss";

interface IMyTag {
  content: string;
  classname?: string;
}

const MyTag: FC<IMyTag> = ({ content, classname }) => {
  return <Tag className={cn(styles.tag, classname)}>{content}</Tag>;
};

export default MyTag;

import { Input } from "antd";
import { FC, useEffect, useRef, useState } from "react";

interface IMyInputSearch {
  placeholder?: string;
  size?: "small" | "middle" | "large" | undefined;
  classname?: string;
  onSearch?: (value: string) => void;
  delay?: number;
  defaultValue?: string;
}

const MyInputSearch: FC<IMyInputSearch> = ({
  placeholder = "Type for search ...",
  size = "middle",
  classname,
  onSearch,
  delay = 1000,
  defaultValue = "",
}) => {
  const [value, setValue] = useState<string>(defaultValue);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (onSearch) onSearch(val);
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleClear = () => {
    setValue("");
    if (onSearch) onSearch("");
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <Input
      placeholder={placeholder}
      size={size}
      className={classname}
      value={value}
      onChange={handleChange}
      allowClear
      onClear={handleClear}
    />
  );
};

export default MyInputSearch;

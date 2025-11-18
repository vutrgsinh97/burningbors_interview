import { useState } from "react";
import MyButton from "../button";
import { Input } from "antd";
import MyIcon from "../icon";

interface MyInputQuantityProps {
  initialQuantity?: number;
  min?: number;
  max?: number;
  onChange?: (quantity: number) => void;
}

const MyInputQuantity = ({
  initialQuantity = 1,
  min = 1,
  max,
  onChange,
}: MyInputQuantityProps) => {
  const [quantity, setQuantity] = useState<number>(initialQuantity);

  const handleIncrease = () => {
    setQuantity((prev) => {
      const newQty = max !== undefined ? Math.min(prev + 1, max) : prev + 1;
      onChange?.(newQty);
      return newQty;
    });
  };

  const handleDecrease = () => {
    setQuantity((prev) => {
      const newQty = Math.max(prev - 1, min);
      onChange?.(newQty);
      return newQty;
    });
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value)) value = min;
    if (value < min) value = min;
    if (max !== undefined && value > max) value = max;
    setQuantity(value);
    onChange?.(value);
  };

  return (
    <div className="flex gap-1 w-30 items-center justify-center border border-gray-400 rounded-lg overflow-hidden">
      <MyButton classname="px-2! border-none!" size="middle" onClick={handleDecrease} disabled={quantity <= min}>
        <MyIcon name="minus" size={18}/>
      </MyButton>
      <Input
        type="number"
        value={quantity}
        onChange={handleChangeInput}
        className="border-none! h-8 flex-1 p-0 text-center no-spinner"
      />
      <MyButton classname="px-2! border-none!" size="middle" onClick={handleIncrease}>
        <MyIcon name="plus" size={20}/>
      </MyButton>
    </div>
  );
};

export default MyInputQuantity
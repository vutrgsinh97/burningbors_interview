import { FC } from "react";
import CartItem from "./cartItem";

type TCartList = {
  carts: TCart[] | [];
};

const CartList: FC<TCartList> = ({ carts }) => {
  return (
    <div className="mt-4 space-y-4 pb-20">
      {carts?.map((item, index) => (
        <CartItem key={item.id} item={item} index={index} />
      ))}
    </div>
  );
};

export default CartList;

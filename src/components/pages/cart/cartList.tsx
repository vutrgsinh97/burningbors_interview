import { staticURL } from "@/configs/app";
import { cn } from "@/libs/utils";
import { useRouter } from "next/router";
import React, { FC } from "react";
import CartItem from "./cartItem";
import { Divider } from "antd";

type TCartList = {
  carts: TCart[] | [];
};

const CartList: FC<TCartList> = ({ carts }) => {
  const router = useRouter();
  const isCartPage = !!router.asPath.match(staticURL.cart);
  return (
    <div
      className={cn(
        "mt-4 space-y-4 pb-20",
        !isCartPage && "h-[58vh] overflow-auto pb-0"
      )}
    >
      {carts?.map((item, index) => (
        <React.Fragment key={item.id}>
          <CartItem
            item={item}
            index={index}
            isCartPage={isCartPage}
          />
          {!isCartPage && (index < carts.length - 1 && <Divider className="bg-gray-800"/>)}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CartList;

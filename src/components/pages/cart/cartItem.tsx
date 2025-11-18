import MyIcon from "@/components/global/icon";
import { getStrPrice } from "@/libs/utils";
import { Divider, Popover } from "antd";
import { FC } from "react";
import CartProductItem from "./cartProductItem";
import React from "react";

type TCartItem = {
  item: TCart;
  index: number;
};

const CartItem: FC<TCartItem> = ({ item, index }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between">
        <div className="text-base text-gray-900">
          Cart <span className="font-bold">#{++index}</span>
        </div>
        <div className="flex gap-2 items-center">
          <Popover content="Total">
            <div className="text-sm">{getStrPrice(item.total)}</div>
          </Popover>
          <Divider type="vertical" size="small" />
          {item.discountedTotal > 0 && (
            <Popover content="Total discount">
              <div className="text-base font-bold">
                {getStrPrice(item.discountedTotal)}
              </div>
            </Popover>
          )}
          <Divider type="vertical" size="small" />
          <Popover content="Total products" className="hidden! sm:flex!">
            <div className="flex gap-1 items-center">
              <MyIcon size={18} name="package" />
              <div className="text-sm">{item.totalProducts}</div>
            </div>
          </Popover>
        </div>
      </div>
      <Divider size="small" />
      <div>
        {item.products.map((proItem, index) => (
          <React.Fragment key={`${item.id}-${proItem.id}`}>
            <CartProductItem index={index} item={proItem} cartId={item.id} />
            {index < item.products.length - 1 && <Divider size="small" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CartItem;

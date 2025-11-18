import { getStrPrice } from "@/libs/utils";
import { Image, Popover } from "antd";
import { FC } from "react";
import CartProductItemQuantity from "./cartProductItemQuantity";
import DeleteProductItem from "./deleteProductItem";

type TProps = {
  item: TProductInCart;
  index: number;
  cartId: number
};

const CartProductItem: FC<TProps> = ({ item, index, cartId }) => {
 
  return (
    <div className="flex gap-2 items-center">
      <div>#{++index}</div>
      <div className="bg-white rounded-lg overflow-hidden p-2 border-2 border-gray-300 w-20 h-20">
        <Image src={item.thumbnail} alt={item.title} className="object-cover" />
      </div>

      <div className="flex-2">
        <div className="text-lg font-semibold">{item.title}</div>
        <div className="mt-2 text-sm font-bold">{getStrPrice(item.price)}</div>
      </div>
      <div className="flex-1 text-sm flex flex-col justify-center space-y-1">
        <div className="flex justify-between">
          <div>Subtotal:</div>
          <Popover content="Total price" className="hidden! sm:flex!">
            <div>{getStrPrice(item.total)}</div>
          </Popover>
        </div>
        <div className="flex justify-between">
          <div>
            Total{" "}
            <span className="text-[12px] font-bold text-green-700">
              ({item.discountPercentage}%)
            </span>
            :
          </div>
          <Popover
            content={`Total price after discount ${item.discountPercentage}%`}
          >
            <div className="text-blue-700 font-bold">
              {getStrPrice(item.discountedTotal)}
            </div>
          </Popover>
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        <CartProductItemQuantity proCart={item} cartId={cartId}/>
      </div>
      <div className="">
        <DeleteProductItem proCart={item} cartId={cartId}/>
      </div>
    </div>
  );
};

export default CartProductItem;

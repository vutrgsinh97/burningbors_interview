import { cn, getStrPrice } from "@/libs/utils";
import { Image, Popover } from "antd";
import { FC } from "react";
import CartProductItemQuantity from "./cartProductItemQuantity";
import DeleteProductItem from "./deleteProductItem";

type TProps = {
  item: TProductInCart;
  index: number;
  cartId: number;
  isCartPage: boolean
};

const CartProductItem: FC<TProps> = ({ item, index, cartId, isCartPage = true }) => {

  return (
    <div className={cn(isCartPage ? "flex gap-2 items-center" : "flex gap-2")}>
      {isCartPage && <div>#{++index}</div>}
      <div
        className={cn(
          "bg-white rounded-lg overflow-hidden p-2 border-2 border-gray-300 w-20 h-20",
          !isCartPage && "col-span-1"
        )}
      >
        <Image src={item.thumbnail} alt={item.title} className="object-cover" />
      </div>

      {isCartPage ? (
        <>
          <div className="flex-2">
            <div className="text-lg font-semibold">{item.title}</div>
            <div className="mt-2 text-sm font-bold">
              {getStrPrice(item.price)}
            </div>
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
            <CartProductItemQuantity proCart={item} cartId={cartId} />
          </div>
          <div className="">
            <DeleteProductItem proCart={item} cartId={cartId} />
          </div>
        </>
      ) : (
        <>
          <div className="col-span-2 flex justify-between flex-1 flex-col">
            <div className="text-lg font-semibold flex-1">{item.title}</div>
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
          </div>
          <div className="col-span-2 flex flex-1 flex-col items-end gap-2">
            <div className="">
              <DeleteProductItem proCart={item} cartId={cartId} />
            </div>
            <div className="">
              <CartProductItemQuantity proCart={item} cartId={cartId} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartProductItem;

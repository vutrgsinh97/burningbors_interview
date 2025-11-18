import MyInputQuantity from "@/components/global/inputQuantity";
import { getNumPriceAfterDiscount } from "@/libs/utils";
import { useCartStore } from "@/stores/carts";
import { FC } from "react";

type TDeleteProductItem = {
  proCart: TProductInCart;
  cartId: number;
};

const CartProductItemQuantity: FC<TDeleteProductItem> = ({
  proCart,
  cartId,
}) => {
  const { carts, updateAllCarts } = useCartStore();

  const handleChangeQuantity = (newQuantity: number) => {
    const cartTarget = carts?.find((cart) => cart.id === cartId); // find cart target
    const newProductInCartTarget = cartTarget?.products
      .map((item) => {
        if (item.id === proCart.id) {
          const newTotal = item.price * newQuantity;
          return {
            ...item,
            quantity: newQuantity,
            total: newTotal,
            discountedTotal: getNumPriceAfterDiscount(
              newTotal,
              item.discountPercentage
            ),
          };
        }

        return item;
      })

    const newCartTarget = {
      ...cartTarget,
      total: Number(
        newProductInCartTarget
          ?.reduce((prev, curr) => (prev += curr.total), 0)
          .toFixed(2)
      ),
      discountedTotal: Number(
        newProductInCartTarget
          ?.reduce((prev, curr) => (prev += curr.discountedTotal), 0)
          .toFixed(2)
      ),
      totalProducts: (cartTarget?.products.length ?? 0) - 1,
      totalQuantity: newQuantity,
      products: newProductInCartTarget,
    } as TCart;

    const newCarts = carts
      ?.map((item) => {
        if (item.id === cartTarget?.id) return newCartTarget;
        return item;
      })
      .filter((i) => i.products.length > 0 && i.totalProducts > 0);

    updateAllCarts(newCarts as TCart[]);

    return;
  };

  return (
    <MyInputQuantity
      initialQuantity={proCart.quantity}
      min={1}
      onChange={handleChangeQuantity}
    />
  );
};

export default CartProductItemQuantity;

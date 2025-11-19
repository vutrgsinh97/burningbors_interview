import MyButton from "@/components/global/button";
import { useLoginToast } from "@/hooks/useShowToastIsLogin";
import { getNumPriceAfterDiscount } from "@/libs/utils";
import { useCartStore } from "@/stores/carts";
import { useUserStore } from "@/stores/user";
import { Spin } from "antd";
import { FC, useState } from "react";
import toast from "react-hot-toast";

type TProps = {
  item: TProduct;
  isOrder: boolean;
};

const AddToCart: FC<TProps> = ({ item, isOrder }) => {
  const user = useUserStore((state) => state.user);
  const showLoginToast = useLoginToast({ message: "Login required to order." });
  const { carts, updateAllCarts } = useCartStore();

  const [isFakeLoading, setIsFakeLoading] = useState<boolean>(false);

  const handleAddToCart = (item: TProduct) => {
    if (!isOrder || !user?.id) return;

    const newProduct: TProductInCart = {
      id: item.id,
      thumbnail: item.thumbnail,
      title: item.title,
      price: item.price,
      quantity: 1,
      total: item.price,
      discountPercentage: item.discountPercentage,
      discountedTotal: getNumPriceAfterDiscount(
        item.price,
        item.discountPercentage
      ),
    };

    if (carts && carts.length > 0) {
      const lastCart = carts[carts.length - 1];

      const existProductInCart =
        lastCart.products.find((p) => p.id === newProduct.id) || null;

      if (existProductInCart) {
        const newProductInCartTarget = carts?.[0].products.map((item) => {
          if (item.id === existProductInCart.id) {
            const newQuantity = item.quantity + 1;
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
        });

        const newLastCart: TCart = {
          ...carts[0],
          products: newProductInCartTarget,
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
          totalProducts: newProductInCartTarget.length,
          totalQuantity: carts[0].totalQuantity + 1,
        };

        updateAllCarts([newLastCart]);
      } else {
        const newProductInCart: TCart = {
          ...lastCart,
          products: [...lastCart.products, newProduct],
          totalProducts: lastCart.totalProducts + 1,
        };

        // update state: bỏ cart cuối và thêm cart mới
        updateAllCarts([...carts.slice(0, -1), newProductInCart]);
      }
    } else {
      const newProductInCart: TCart = {
        id: 1,
        products: [newProduct],
        total: item.price,
        discountedTotal: getNumPriceAfterDiscount(
          item.price,
          item.discountPercentage
        ),
        userId: user.id,
        totalProducts: 1,
        totalQuantity: 1,
      };
      updateAllCarts([newProductInCart]);
    }

    setIsFakeLoading(false);
    toast.success("Add product success!", { position: "top-center" });
  };

  if (!carts && isFakeLoading)
    return (
      <>
        <Spin fullscreen />
        <MyButton type="primary" size="large">
          <span className="uppercase font-bold text-sm">Add to Card</span>
        </MyButton>
      </>
    );

  return (
    <MyButton
      type="primary"
      size="large"
      disabled={item.stock <= 0}
      loading={isFakeLoading}
      onClick={() => {
        if (!isOrder) {
          showLoginToast();
          return;
        }
        setIsFakeLoading(true);
        setTimeout(() => {
          handleAddToCart(item);
        }, 500);
      }}
    >
      <span className="uppercase font-bold text-sm">Add to Card</span>
    </MyButton>
  );
};

export default AddToCart;

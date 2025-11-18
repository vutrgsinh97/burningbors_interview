import MyButton from "@/components/global/button";
import MyIcon from "@/components/global/icon";
import { useCartStore } from "@/stores/carts";
import { Modal } from "antd";
import { FC, useState } from "react";

type TDeleteProductItem = {
  proCart: TProductInCart;
  cartId: number;
};

const DeleteProductItem: FC<TDeleteProductItem> = ({ proCart, cartId }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { carts, updateAllCarts } = useCartStore();

  const handleRemoveProduct = () => {
    const cartTarget = carts?.find((cart) => cart.id === cartId);
    const newCartProductAfterRemove =
      cartTarget?.products.filter((c) => c.id !== proCart.id) || [];

    const newCartTarget = {
      ...cartTarget,
      total: Number(
        newCartProductAfterRemove
          .reduce((prev, curr) => (prev += curr.total), 0)
          .toFixed(2)
      ),
      discountedTotal: Number(
        newCartProductAfterRemove
          .reduce((prev, curr) => (prev += curr.discountedTotal), 0)
          .toFixed(2)
      ),
      totalProducts: (cartTarget?.products.length ?? 0) - 1,
      totalQuantity: newCartProductAfterRemove.reduce(
        (prev, curr) => (prev += curr.quantity),
        0
      ),
      products: newCartProductAfterRemove,
    };

    const newCarts = carts
      ?.map((item) => {
        if (item.id === newCartTarget.id) return newCartTarget;
        return item;
      })
      .filter((i) => i.products.length > 0);

    updateAllCarts(newCarts as TCart[]);

    return;
  };

  const handleToggle = () => setOpen(!open);

  return (
    <>
      <MyButton type="primary" danger classname="px-2!" onClick={handleToggle}>
        <MyIcon name="trashFilled" size={18} imgClass="filter-white" />
      </MyButton>

      <Modal
        title="Delete Item?"
        open={open}
        onOk={handleRemoveProduct}
        onCancel={handleToggle}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to remove this product from your cart?</p>
        <p>This action cannot be undone.</p>
      </Modal>
    </>
  );
};

export default DeleteProductItem;

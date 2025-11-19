import { useCartStore } from "@/stores/carts";
import styles from "./index.module.scss";
import CartList from "../cart/cartList";

const OrderList = () => {
  const { carts } = useCartStore();

  return (
    <div className={styles["box"]}>
      <div className={styles["box-title"]}>Order List</div>
      {carts && <CartList carts={carts || []} />}
    </div>
  );
};

export default OrderList;

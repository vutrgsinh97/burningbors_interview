import { getStrPrice } from "@/libs/utils";
import { useCartStore } from "@/stores/carts";
import styles from "./index.module.scss";

const CheckoutSummary = () => {
  const { getTotalPrice, getTotalPriceDiscount } = useCartStore();

  return (
    <div className={styles["box"]}>
      <div className={styles["box-title"]}>Order Summary</div>
      <div>
        <div className="flex justify-between">
          <div>Subtotal</div>
          <div className="text-lg font-base">
            {getStrPrice(getTotalPrice())}
          </div>
        </div>
        <div className="flex justify-between">
          <div>Total discount</div>
          <div className="text-lg font-bold">
            {getStrPrice(getTotalPriceDiscount())}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;

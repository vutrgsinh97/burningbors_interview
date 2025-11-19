import MyInputForm from "@/components/global/inputForm";
import { FC } from "react";
import { Control } from "react-hook-form";
import styles from "./index.module.scss";
import MyInputCardNumberForm from "@/components/global/inputCardNumber";
import MyInputCardExpiryDateForm from "@/components/global/inputCardExpiryDateForm";
import MyRadioForm from "@/components/global/radioForm";

type TCheckoutPayment = {
  control: Control<TCheckoutCart>;
  disabled: boolean;
};

/**
- Payment method selection
- Card details: Card number, Expiry date, CVV
- Card number auto-formatting (e.g., 1234-5678-9012-3456)
 */

const CheckoutPayment: FC<TCheckoutPayment> = ({ control, disabled }) => {
  return (
    <div className={styles["box"]}>
      <div className={styles["box-title"]}>Payment Information</div>

      <div className="grid grid-cols-2 gap-2">
        <MyRadioForm
          control={control}
          name="paymentMethod"
          options={[
            { value: "1", label: "Online Payment" },
            { value: "2", label: "COD – Cash on Delivery" },
          ]}
          classname="col-span-full"
          disabled={disabled}
        />
        <MyInputCardNumberForm
          control={control}
          name="cardNumber"
          label="Card Number"
          size="large"
          placeholder="1234 5678 9012 3456"
          classname="col-span-full"
          required
          disabled={disabled}
        />
        <MyInputCardExpiryDateForm
          control={control}
          name="expiryDate"
          label="Expiry Date (MM/YY)"
          size="large"
          placeholder="MM/YY"
          classname="col-span-1"
          required
          disabled={disabled}
        />
        <MyInputForm
          control={control}
          name="CVV"
          label="CVV"
          size="large"
          placeholder="123"
          classname="col-span-1"
          required
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default CheckoutPayment;

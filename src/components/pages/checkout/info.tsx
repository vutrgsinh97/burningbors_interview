import MyInputForm from "@/components/global/inputForm";
import { FC } from "react";
import { Control } from "react-hook-form";
import styles from "./index.module.scss";
import MyInputAreaForm from "@/components/global/inputAreaForm";

/**
- Recipient: Name, Phone, Email
- Address: Postal code, Street address, Detailed address
- Delivery notes
 */

type TCheckoutInfo = {
  control: Control<TCheckoutCart>;
  disabled: boolean
};

const CheckoutInfo: FC<TCheckoutInfo> = ({ control, disabled }) => {
  return (
    <div className={styles["box"]}>
      <div className={styles["box-title"]}>Shipping Information</div>
      <div className="grid grid-cols-2 gap-2">
        <MyInputForm
          control={control}
          name="name"
          label="Name"
          size="large"
          required
          classname="col-span-full"
          disabled={disabled}
        />
        <MyInputForm
          control={control}
          name="email"
          label="Email"
          size="large"
          required
          classname="col-span-full"
          disabled={disabled}
        />
        <MyInputForm
          control={control}
          name="phone"
          label="Phone"
          size="large"
          required
          classname="col-span-1"
          disabled={disabled}
        />
        <MyInputForm
          control={control}
          name="postalCode"
          label="Postal Code"
          size="large"
          required
          classname="col-span-1"
          disabled={disabled}
        />
        <MyInputForm
          control={control}
          name="streetAddress"
          label="Street Address"
          size="large"
          required
          classname="col-span-full"
          disabled={disabled}
        />
        <MyInputForm
          control={control}
          name="detailedAddress"
          label="Detailed Address"
          size="large"
          required
          classname="col-span-full"
          disabled={disabled}
        />
        <MyInputAreaForm
          control={control}
          name="deliveryNotes"
          label="Delivery Notes"
          size="large"
          required
          classname="col-span-full"
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default CheckoutInfo;

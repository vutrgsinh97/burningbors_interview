import MyButton from "@/components/global/button";
import MainLayout from "@/components/layouts/MainLayout";
import CheckoutInfo from "@/components/pages/checkout/info";
import OrderList from "@/components/pages/checkout/orderList";
import CheckoutPayment from "@/components/pages/checkout/payment";
import { schemaCheckoutForm } from "@/libs/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, type ReactElement } from "react";
import { Control, useForm } from "react-hook-form";

import { useCartStore } from "@/stores/carts";
import { Spin } from "antd";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { staticURL } from "@/configs/app";
import { withAuth } from "@/components/hoc/withAuth";

const CheckoutSummary = dynamic(
  () => import("@/components/pages/checkout/summary"),
  {
    ssr: false,
  }
);

const CheckoutPage: NextPageWithLayout = () => {
  const { removeAllCart } = useCartStore();
  const [isFakeLoading, setIsFakeLoading] = useState(true);
  const router = useRouter();

  const { control, handleSubmit } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaCheckoutForm),
    defaultValues: { paymentMethod: "1" },
  });

  const handleCheckout = (data: TCheckoutCart) => {
    setIsFakeLoading(true);
    setTimeout(() => {
      console.log(data);
      removeAllCart();
      setIsFakeLoading(false);
      router.push(staticURL.afterCheckout, { query: { status: "success" } });
    }, 3000);
  };

  return (
    <>
      <Spin fullscreen />
      <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <CheckoutInfo
            control={control as unknown as Control<TCheckoutCart>}
            disabled={isFakeLoading}
          />
          <CheckoutPayment
            control={control as unknown as Control<TCheckoutCart>}
            disabled={isFakeLoading}
          />
        </div>
        <div className="space-y-4">
          <OrderList />
          <CheckoutSummary />
          <MyButton
            onClick={handleSubmit(handleCheckout)}
            type="primary"
            size="large"
            classname="w-full!"
            loading={isFakeLoading}
          >
            Checkout
          </MyButton>
        </div>
      </div>
    </>
  );
};

CheckoutPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout title="Checkout">{page}</MainLayout>;
};

export default withAuth(CheckoutPage);

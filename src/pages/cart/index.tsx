import MyButton from "@/components/global/button";
import { withAuth } from "@/components/hoc/withAuth";
import MainLayout from "@/components/layouts/MainLayout";
import CartList from "@/components/pages/cart/cartList";
import CartSummary from "@/components/pages/cart/cartSummary";
import NotFound from "@/components/pages/notFound";
import { staticURL } from "@/configs/app";
import { useCartStore } from "@/stores/carts";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const CartPage: NextPageWithLayout = () => {
  const carts = useCartStore(state => state.carts);
  const router = useRouter();


  if ((carts?.length ?? 0) <= 0)
    return (
      <NotFound
        title="no result"
        description=""
        extra={
          <MyButton
            classname="mt-4"
            type="primary"
            onClick={() => router.push(staticURL.product)}
          >
            Back to Product list
          </MyButton>
        }
      />
    );

  return (
    <div className="">
      {carts && <CartList carts={carts || []} />}
      <CartSummary />
    </div>
  );
};

CartPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout title="Carts">{page}</MainLayout>;
};

export default withAuth(CartPage);

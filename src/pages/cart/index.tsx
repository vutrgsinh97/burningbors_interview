import { cartAPI } from "@/api/cart";
import MyButton from "@/components/global/button";
import { withAuth } from "@/components/hoc/withAuth";
import MainLayout from "@/components/layouts/MainLayout";
import CartList from "@/components/pages/cart/cartList";
import NotFound from "@/components/pages/notFound";
import { staticURL } from "@/configs/app";
import { useCartStore } from "@/stores/carts";
import { useUserStore } from "@/stores/user";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import CartSummary from "@/components/pages/cart/cartSummary";

const CartPage: NextPageWithLayout = () => {
  const { carts, updateAllCarts } = useCartStore();
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  const handleGetCart = async (): Promise<TCartResponse> => {
    if (!user?.id) {
      updateAllCarts(null);
      return { carts: [], total: 0, skip: 0, limit: 0 };
    }
    const res = await cartAPI.getCartByUser(user.id);
    const carts = res.data.carts;
    updateAllCarts(carts);
    return res.data;
  };

  const { data, isLoading, isFetching } = useQuery<TCartResponse>({
    queryKey: [cartAPI.keyGetCartByUser, user?.id],
    queryFn: handleGetCart,
    enabled: !!user?.id,
  });

  if (isLoading) {
    return <Spin fullscreen />;
  }

  if ((data?.total ?? 0) <= 0 && !isLoading)
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
      {isFetching && (
        <div className="flex gap-2 items-center justify-center m-auto mt-2">
          <Spin
            tip="Loading"
            size="small"
            indicator={<LoadingOutlined spin />}
          />
          Loading ...
        </div>
      )}
      {carts && <CartList carts={carts || []} />}
      <CartSummary />
    </div>
  );
};

CartPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout title="Carts">{page}</MainLayout>;
};

export default withAuth(CartPage);

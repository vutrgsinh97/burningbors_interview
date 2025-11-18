import MyButton from "@/components/global/button";
import { staticURL } from "@/configs/app";
import { getStrPrice } from "@/libs/utils";
import { useCartStore } from "@/stores/carts";
import { useRouter } from "next/router";

const CartSummary = () => {
  const router = useRouter();

  const { getTotalPrice, getTotalProduct, getTotalPriceDiscount } =
    useCartStore();

  return (
    <div className="bg-white border-t-2 border-t-gray-300 w-full fixed left-0 bottom-0">
      <div className="app-container">
        <div className="flex items-center py-2">
          <div className="flex flex-1">
            <div className="flex gap-2 flex-1 items-center">
              <div>Subtotal:</div>
              <div className="text-lg font-bold text-green-800">{getStrPrice(getTotalPrice())}</div>
            </div>
            <div className="flex gap-2 flex-1 items-center">
              <div>Total:</div>
              <div className="text-lg font-bold text-gray-800">{getStrPrice(getTotalPriceDiscount())}</div>
            </div>
            <div className="flex gap-2 flex-1">
              <div>Total Products:</div>
              <div className="text-lg font-bold">{getTotalProduct()}</div>
            </div>
          </div>
          <MyButton
            type="primary"
            size="large"
            onClick={() => router.push(staticURL.checkout)}
          >
            Checkout
          </MyButton>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;

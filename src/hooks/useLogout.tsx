import { staticURL } from "@/configs/app";
import { handleRemoveToken } from "@/libs/utils";
import { useCartStore } from "@/stores/carts";
import { useUserStore } from "@/stores/user";
import { useRouter } from "next/router";

const useLogout = () => {
  const router = useRouter();
  const { removeUser } = useUserStore();
  const { removeAllCart } = useCartStore();

  const logout = async (isReturnHome: boolean = true) => {
    try {
      handleRemoveToken();
      removeUser();
      removeAllCart();
      if (isReturnHome) {
        await router.push(staticURL.product);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return { logout };
};

export default useLogout;

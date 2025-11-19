import { staticURL } from "@/configs/app";
import { handleRemoveToken } from "@/libs/utils";
import { useCartStore } from "@/stores/carts";
import { useUserStore } from "@/stores/user";
import { useUserDetailStore } from "@/stores/userDetail";
import { useRouter } from "next/router";

const useLogout = () => {
  const router = useRouter();
  const { removeUser } = useUserStore();
  const { removeAllCart } = useCartStore();
  const { removeUserDetail } = useUserDetailStore();

  const logout = async (isReturnHome: boolean = true) => {
    try {
      handleRemoveToken();
      removeUser();
      removeAllCart();
      removeUserDetail();
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

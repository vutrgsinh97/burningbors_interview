
import { handleRemoveToken } from "@/libs/utils";
import { useUserStore } from "@/stores/user";
import { useRouter } from "next/router";

const useLogout = () => {
  const router = useRouter();
  const { removeUser } = useUserStore();

  const logout = async (isReturnHome: boolean = true) => {
    try {
      handleRemoveToken();
      removeUser(); 
      if (isReturnHome) {
        await router.push("/product");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return { logout };
};

export default useLogout;

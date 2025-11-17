import { handleGetToken } from "@/libs/utils";
import { useUserStore } from "@/stores/user";

const useIsLogin = () => {

  const user = useUserStore((state) => state.user);
  const token = handleGetToken();

  return !!user && !!token;;
};

export default useIsLogin;

import { authAPI } from "@/api/authen";
import { cartAPI } from "@/api/cart";
import MyButton from "@/components/global/button";
import MyInputForm from "@/components/global/inputForm";
import { staticURL } from "@/configs/app";
import { handleSetToken } from "@/libs/utils";
import { schemaLoginForm } from "@/libs/validation";
import { useCartStore } from "@/stores/carts";
import { useUserStore } from "@/stores/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const LoginForm = () => {
  const updateUser = useUserStore((state) => state.updateUser);
  const router = useRouter();
  const updateCart = useCartStore((state) => state.updateAllCarts);

  const { control, handleSubmit } = useForm<TLoginForm>({
    mode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schemaLoginForm),
  });

  const handleFetchingCart = async (userId: number) => {
    try {
      const res = await cartAPI.getCartByUser(userId);
      const data = res.data.carts;

      if (res.data.total > 0) {
        updateCart(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAfterLogin = (
    accessToken: string,
    refreshToken: string,
    user: TUser
  ) => {
    if (accessToken && refreshToken) {
      try {
        // const userParse = getJWTDecode(accessToken);

        handleSetToken({ token: accessToken, refresh: refreshToken });
      } catch (err) {
        toast.error("Failed to decode JWT user data");
      }
    }

    if (user?.id) {
      updateUser(user);
      router.push(staticURL.product);
      handleFetchingCart(user.id);
    }
  };

  const mutationLogin = useMutation({
    mutationKey: [authAPI.keyLogin],
    mutationFn: (data: TLoginForm) => authAPI.login(data),
    onSuccess: (res) => {
      const { accessToken, refreshToken, ...user } = res.data;
      handleAfterLogin(accessToken || "", refreshToken || "", user || null);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleLogin = (data: TLoginForm) => {
    mutationLogin.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <div className="space-y-4 my-4">
        <MyInputForm
          control={control}
          name="username"
          placeholder="Enter your username"
          label="Username"
          size="large"
          required
          disabled={mutationLogin.isPending}
        />
        <MyInputForm
          control={control}
          name="password"
          placeholder="Enter your password"
          label="Password"
          size="large"
          required
          inputType="password"
          disabled={mutationLogin.isPending}
        />
      </div>

      <MyButton
        type="primary"
        loading={mutationLogin.isPending}
        size="large"
        classname="w-full mt-4"
        htmlType="submit"
      >
        Sign In
      </MyButton>
    </form>
  );
};

export default LoginForm;

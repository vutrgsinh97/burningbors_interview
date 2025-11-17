import BlankLayout from "@/components/layouts/BlankLayout";
import LoginForm from "@/components/pages/login/loginForm";
import { useUserStore } from "@/stores/user";
import { Image } from "antd";
import { useRouter } from "next/router";
import type { ReactElement } from "react";

const LoginPage: NextPageWithLayout = () => {
  const router = useRouter();
  const user = useUserStore(state => state.user);

  if (user) {
    router.push("/product");
    return
  }

  return (
    <div className="w-screen h-screen overflow-hidden rounded-md flex items-center justify-center px-4">
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4! rounded-xl shadow-2xl app-container">
        <div className="hidden md:block sm:h-full flex-none sm:flex-1 rounded-xl overflow-hidden">
          <Image
            alt="login-picture"
            preview={false}
            src="/login-art.png"
            className="object-cover"
            height={"100%"}
          />
        </div>
        <div className="flex-1 flex flex-col gap-4 justify-center lg:px-8!">
          <div className="text-2xl text-gray-800 font-semibold">Welcome Back</div>
          <div className="text-gray-600 text-base">
            Today is a new day. Sign in to start your order.
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <BlankLayout title="Login">{page}</BlankLayout>;
};

export default LoginPage;

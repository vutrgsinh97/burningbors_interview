import { staticURL } from "@/configs/app";
import useIsLogin from "@/hooks/useCheckLogin";
import { useRouter } from "next/router";
import { JSX } from "react";
import MyButton from "../global/button";

export function withAuth<P extends JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<P> & { getLayout?: (page: JSX.Element) => JSX.Element }
) {
  const AuthWrapper = (props: P) => {
    const isLogged = useIsLogin();
    const router = useRouter();

    if (!isLogged)
      return (
        <div className="w-screen h-screen overflow-hidden flex items-center justify-center px-4">
          <div className="flex flex-col sm:flex-row gap-4 bg-red-50 p-4 rounded-xl shadow-2xl">
            <div className="flex-1 flex flex-col gap-4 justify-center">
              <div className="text-2xl text-gray-800 font-semibold">Oops!</div>
              <div className="text-gray-800 text-lg">
                You need to log in to access this page.
              </div>
              <MyButton
                type="primary"
                size="large"
                onClick={() => router.push(staticURL.login)}
              >
                Login now
              </MyButton>
            </div>
          </div>
        </div>
      );

    const content = <WrappedComponent {...props} />;

    return WrappedComponent.getLayout ? WrappedComponent.getLayout(content) : content;
  };

  return AuthWrapper;
}

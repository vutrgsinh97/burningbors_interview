import { staticURL } from "@/configs/app";
import useIsLogin from "@/hooks/useCheckLogin";
import useLogout from "@/hooks/useLogout";
import { getJWTDecode, handleGetToken } from "@/libs/utils";
import { useRouter } from "next/router";
import { JSX, useEffect } from "react";

export function withAuth<P extends JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<P> & {
    getLayout?: (page: JSX.Element) => JSX.Element;
  }
) {
  const AuthWrapper = (props: P) => {
    const isLogged = useIsLogin();
    const router = useRouter();
    const { logout } = useLogout();

    const accessToken = handleGetToken();

    useEffect(() => {
      if (!accessToken && !isLogged) {
        router.replace(staticURL.login);
      }

      if (accessToken) {
        const userParse = getJWTDecode(accessToken);

        if (userParse.exp * 1000 < Date.now()) {
          logout();
        }
      }
    }, [accessToken, isLogged, router]);

    if (!accessToken || !isLogged) return null;

    const content = <WrappedComponent {...props} />;

    return WrappedComponent.getLayout
      ? WrappedComponent.getLayout(content)
      : content;
  };

  return AuthWrapper;
}

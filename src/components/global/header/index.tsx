import { useRouter } from "next/router";
import MyButton from "../button";
import MyIcon from "../icon";
import MyInputSearch from "../inputSearch";
import { useUserStore } from "@/stores/user";
import { Avatar, Badge } from "antd";
import useLogout from "@/hooks/useLogout";
import { useLoginToast } from "@/hooks/useShowToastIsLogin";
import useIsLogin from "@/hooks/useCheckLogin";
import { staticURL } from "@/configs/app";
import { useCartStore } from "@/stores/carts";
import Link from "next/link";

export default function AppHeader() {
  const router = useRouter();
  const { logout } = useLogout();
  const q = (router.query.q as string) || "";
  const user = useUserStore((state) => state.user);
  const isLogin = useIsLogin();
  const totalCarts = useCartStore((state) => state.getTotalCarts());
  const showLoginToast = useLoginToast({
    message: "Login required to see cart.",
  });

  const handleSearch = (val: string) => {
    router.replace(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          q: val || undefined,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleRedirectLogin = () => router.push(staticURL.login);

  return (
    <div className="py-4 flex justify-between">
      <div className="flex-1">
        <MyInputSearch
          size="middle"
          classname="max-w-[480px]"
          placeholder="Search by product name ..."
          onSearch={(value) => handleSearch(value)}
          defaultValue={q}
        />
      </div>
      <div className="flex-1 text-center">
        <Link href={staticURL.product} className="text-2xl space-x-1">
          <span>Mini</span>
          <span className="text-blue-600 font-bold">Shop</span>
        </Link>
      </div>
      <div className="flex gap-2 flex-1 justify-end">
        {isLogin ? (
          <Badge count={totalCarts} overflowCount={99}>
            <MyButton
              classname="px-1! hover:bg-gray-100!"
              hiddenBorder
              onClick={() => {
                if (!isLogin) {
                  showLoginToast();
                  return;
                }
                router.push(staticURL.cart);
              }}
            >
              <MyIcon name={"bag"} />
            </MyButton>
          </Badge>
        ) : (
          <MyButton
            classname="px-1! hover:bg-gray-100!"
            hiddenBorder
            onClick={() => {
              if (!isLogin) {
                showLoginToast();
                return;
              }
              router.push(staticURL.cart);
            }}
          >
            <MyIcon name={"bag"} />
          </MyButton>
        )}

        {user ? (
          <div className="flex gap-2">
            <div className="flex-1">
              <Avatar src={user.image} />
            </div>
            <MyButton
              classname="px-1! hover:bg-red-50! border-red-300! border-2!"
              onClick={() => logout()}
            >
              <MyIcon name={"logout"} />
            </MyButton>
          </div>
        ) : (
          <MyButton
            classname="px-1! hover:bg-gray-100!"
            hiddenBorder
            onClick={handleRedirectLogin}
          >
            <MyIcon name={"user"} />
          </MyButton>
        )}
      </div>
    </div>
  );
}

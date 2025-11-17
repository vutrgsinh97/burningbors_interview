import { useRouter } from "next/router";
import MyButton from "../button";
import MyIcon from "../icon";
import MyInputSearch from "../inputSearch";
import { useUserStore } from "@/stores/user";
import { Avatar } from "antd";
import useLogout from "@/hooks/useLogout";

export default function AppHeader() {
  const router = useRouter();
  const { logout } = useLogout();
  const q = (router.query.q as string) || "";
  const user = useUserStore((state) => state.user);

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

  const handleRedirectLogin = () => router.push("/login");

  return (
    <div className="py-4 flex justify-between">
      <MyInputSearch
        size="middle"
        classname="max-w-[480px]"
        placeholder="Search by product name ..."
        onSearch={(value) => handleSearch(value)}
        defaultValue={q}
      />
      <div className="flex gap-2">
        <MyButton classname="px-1! hover:bg-gray-100!" hiddenBorder>
          <MyIcon name={"bag"} />
        </MyButton>

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

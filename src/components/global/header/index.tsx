import { useRouter } from "next/router";
import MyButton from "../button";
import MyIcon from "../icon";
import MyInputSearch from "../inputSearch";

export default function AppHeader() {
  const router = useRouter();
  const q = (router.query.q as string) || "";
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

  return (
    <div className="py-4 flex justify-between">
      <MyInputSearch
        size="middle"
        classname="max-w-[480px]"
        placeholder="Search by product name ..."
        onSearch={(value) => handleSearch(value)}
        defaultValue={q}
      />
      {/* <h1 className="text-2xl text-stone-950 font-bold">ShopApp</h1> */}
      <div className="flex gap-2">
        <MyButton classname="px-1! hover:bg-gray-100!" hiddenBorder>
          <MyIcon name={"bag"} />
        </MyButton>
        <MyButton classname="px-1! hover:bg-gray-100!" hiddenBorder>
          <MyIcon name={"user"} />
        </MyButton>
      </div>
    </div>
  );
}

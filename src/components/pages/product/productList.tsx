import { productAPI } from "@/api/product";
import { cn } from "@/libs/utils";
import {
  useInfiniteQuery
} from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import NotFound from "../notFound";
import styles from "./product.module.scss";
import ProductItem from "./productItem";
import ProductItemSkeleton from "./proItemSkeleton";
import useIsLogin from "@/hooks/useCheckLogin";

const LIMIT = 20;

const ProductList = () => {
  const router = useRouter();
  const query = router.query;
  const limit = +(query.limit as string) || LIMIT;
  const q = (query.q as string) || "";
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isLogin = useIsLogin()

  // I need to seperate api because DummyJSON is stupid, damn :)))
  const fetchProducts = ({ pageParam = 0 }) => {
    const skip = pageParam * limit;

    if (q && q.trim() !== "") {
      return productAPI.getBySearch({ q, limit, skip });
    }

    return productAPI.getList({ limit, skip });
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: [productAPI.keyGetList, q],
      queryFn: fetchProducts,
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => {
        const loaded = pages.length * limit;

        const total = lastPage.data.total;
        if (loaded < total) return pages.length;
        return undefined;
      },
      enabled: router.isReady,
      refetchOnMount: false,
      staleTime: Infinity,
    });

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (!isLoading && (data?.pages[0]?.data?.total ?? 0) <= 0) {
    return <NotFound title="no result" description="" />;
  }

  const isLoadMore =
    (data?.pages[0]?.data?.limit ?? 0) + (data?.pages[0]?.data?.skip ?? 0) <
    (data?.pages[0]?.data?.total ?? 0);

  return (
    <div className={cn(styles.wrapper, "")} ref={containerRef}>
      {isLoading &&
        Array.from({ length: limit }).map((_, i) => (
          <ProductItemSkeleton key={i} />
        ))}

      {data?.pages.map((page, pageIndex) =>
        page.data.products.map((item: TProduct) => (
          <ProductItem key={`${pageIndex}-${item.id}`} item={item} isOrder={isLogin}/>
        ))
      )}

      {isFetchingNextPage &&
        Array.from({ length: 6 }).map((_, i) => (
          <ProductItemSkeleton key={i} />
        ))}

      {isLoadMore && router.isReady && (
        <div ref={sentinelRef} className={"h-20 col-span-full"} />
      )}
    </div>
  );
};

export default ProductList;

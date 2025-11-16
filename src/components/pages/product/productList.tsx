import { productAPI } from "@/api/product";
import { cn } from "@/libs/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import styles from "./product.module.scss";
import ProductItem from "./productItem";
import ProductItemSkeleton from "./proItemSkeleton";
import NotFound from "../notFound";

const LIMIT = 20;

const ProductList = () => {
  const router = useRouter();
  const query = router.query;
  const limit = +(query.limit as string) || LIMIT;
  const q = (query.q as string) || "";
  const sentinelRef = useRef<HTMLDivElement | null>(null);

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

  if (!isLoading && (data?.pages[0]?.data?.total ?? 0) <=0) {
    return <NotFound title="no result" description=""/>
  }

  return (
    <div className={cn(styles.wrapper)}>
      {/* {!isLoading && !data.} */}
      {isLoading &&
        Array.from({ length: limit }).map((_, i) => (
          <ProductItemSkeleton key={i} />
        ))}

      {data?.pages.map((page, pageIndex) =>
        page.data.products.map((item: TProduct) => (
          <ProductItem key={`${pageIndex}-${item.id}`} item={item} />
        ))
      )}

      {isFetchingNextPage &&
        Array.from({ length: 6 }).map((_, i) => (
          <ProductItemSkeleton key={i} />
        ))}

      <div ref={sentinelRef} className="h-10"></div>
    </div>
  );
};

export default ProductList;

import MyIcon from "@/components/global/icon";
import MyTag from "@/components/global/tag";
import { cn, getStrPrice, getStrPriceAfterDiscount } from "@/libs/utils";
import { Image, Skeleton } from "antd";
import { FC, useState } from "react";
import AddToCart from "./addToCart";
import styles from "./product.module.scss";

type IProductItem = {
  item: TProduct;
  isOrder: boolean;
};

const MyImageLoading = ({
  thumbnail,
  title,
}: {
  thumbnail: string;
  title: string;
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-full flex items-center justify-center h-64 relative">
      {loading ? (
        <Skeleton.Image active className="absolute inset-0 w-full! h-full!" />
      ) : null}

      <Image
        src={thumbnail}
        alt={`${title}-${thumbnail}`}
        preview={false}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
        className={
          loading
            ? "opacity-0 -z-10"
            : "opacity-100 transition-opacity duration-300"
        }
      />
    </div>
  );
};

const ProductItem: FC<IProductItem> = ({ item, isOrder }) => {
  const discountPrice = getStrPriceAfterDiscount(
    item.price,
    item.discountPercentage
  );
  const isDiscount = item.discountPercentage > 0;

  return (
    <div key={item.id} className={styles["item"]}>
      <div>
        <MyImageLoading thumbnail={item.thumbnail} title={item.title} />
        <div className={styles["item-content"]}>
          <div className={styles["item-info"]}>
            <MyTag content={item.category} />
            <div className={styles["item-info-more"]}>
              <MyIcon name={"star"} size={14} />
              <div className={styles["item-info-rating"]}>{item.rating}</div>
              <div className={styles["item-info-review"]}>
                ({item.reviews.length})
              </div>
            </div>
          </div>

          <div className={styles["item-title"]}>{item.title}</div>
          <div className={styles["item-description"]}>{item.description}</div>
          <div className={styles["item-price"]}>
            {isDiscount && (
              <div className={styles["item-price-discount"]}>
                {discountPrice}
              </div>
            )}
            <div
              className={cn(
                styles["item-price-original"],
                isDiscount && "text-gray-500 text-sm line-through"
              )}
            >
              {getStrPrice(item.price)}
            </div>
          </div>
        </div>
      </div>
      <AddToCart item={item} isOrder={isOrder} />
    </div>
  );
};

export default ProductItem;

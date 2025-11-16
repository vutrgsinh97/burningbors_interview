import MainLayout from "@/components/layouts/MainLayout";
import type { ReactElement } from "react";

import dynamic from "next/dynamic";

const ProductList = dynamic(
  () => import("@/components/pages/product/productList"),
  {
    ssr: false,
  }
);

const ProductPage: NextPageWithLayout = () => {
  return (
    <div className="py-4">
      <ProductList />
    </div>
  );
};

ProductPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default ProductPage;

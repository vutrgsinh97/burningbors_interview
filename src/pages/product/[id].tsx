
import { withAuth } from "@/components/hoc/withAuth";
import MainLayout from "@/components/layouts/MainLayout";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const ProductDetail: NextPageWithLayout = () => {
  const router = useRouter();

  return <p>Product Detail: {router.query.id}</p>;
};

ProductDetail.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout title="">
      <div className="pro_detail">{page}</div>
    </MainLayout>
  );
};

export default withAuth(ProductDetail);

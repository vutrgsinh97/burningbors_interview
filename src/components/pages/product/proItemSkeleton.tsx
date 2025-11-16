import { Skeleton } from "antd";

const ProductItemSkeleton = () => {
  return (
    <div className={"border p-3 flex flex-col border-gray-200 rounded-lg bg-white"}>
      <div>
        <div className="h-64 flex items-center justify-center">
          <Skeleton.Image active />
        </div>
        <div className="flex justify-between">
          <Skeleton.Input size="small"/>
          <Skeleton.Input size="small"/>
        </div>
        <Skeleton paragraph className="mb-4 mt-2" active/>
        <Skeleton.Input active className="my-2"/>
      </div>
      <Skeleton.Button size="large" className="w-full " block />
    </div>
  );
};

export default ProductItemSkeleton;

import MyButton from "@/components/global/button";
import { withAuth } from "@/components/hoc/withAuth";
import { staticURL } from "@/configs/app";
import { cn } from "@/libs/utils";
import { useRouter } from "next/router";

const AfterCheckoutPage: NextPageWithLayout = () => {
  const router = useRouter();
  const isSuccess = (router.query.status as string) === "success";

  return (
    <div
      className={cn(
        "w-screen h-screen flex items-center justify-center ",
        isSuccess ? "bg-green-50" : "bg-red-50"
      )}
    >
      <div
        className={cn(
          "border-2  p-4 rounded-lg shadow-lg flex flex-col items-center justify-center gap-4",
          isSuccess
            ? "bg-green-100 border-green-200"
            : "bg-red-100 border-red-200"
        )}
      >
        <div className="text-lg">
          {isSuccess
            ? "Thank you for you order!"
            : "Sorry! Cannot process your order! Please try again!"}
        </div>
        <MyButton
          classname=""
          type="primary"
          size="large"
          danger={!isSuccess}
          onClick={() =>
            router.push(isSuccess ? staticURL.product : staticURL.cart)
          }
        >
          {isSuccess ? "Back to product" : "Back to cart"}
        </MyButton>
      </div>
    </div>
  );
};

export default withAuth(AfterCheckoutPage);

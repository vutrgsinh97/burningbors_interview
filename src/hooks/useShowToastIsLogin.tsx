import MyButton from "@/components/global/button";
import { staticURL } from "@/configs/app";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

interface ILoginToastProps {
  message?: string;
}

export const useLoginToast= ({ message = "" }: ILoginToastProps) => {
  const router = useRouter();

  const showToast = () =>
    toast(
      (t) => (
        <div className="space-x-2 flex items-center">
          <span>{message}</span>
          <MyButton
            type="primary"
            onClick={() => {
                router.push(staticURL.login);
                toast.dismissAll();
            }}
          >
            Login now
          </MyButton>
        </div>
      ),
      {
        className: "bg-red-50! border-2 border-red-200",
        duration: 10000,
        position: "top-center",
      }
    );

  return showToast;
};

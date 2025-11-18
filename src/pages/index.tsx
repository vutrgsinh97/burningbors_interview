import { staticURL } from "@/configs/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (router.asPath.includes("")) {
      router.push(staticURL.product);
    }
  }, [router]);

  return null;
}

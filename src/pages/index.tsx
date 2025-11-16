import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (router.asPath.includes("")) {
      router.push("/product?limit=20&q=");
    }
  }, [router]);

  return null;
}

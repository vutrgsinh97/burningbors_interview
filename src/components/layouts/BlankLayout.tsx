import { cn } from "@/libs/utils";
import { useIsFetching } from "@tanstack/react-query";
import Head from "next/head";
import { ReactNode } from "react";

export default function BlankLayout({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  const isFetching = useIsFetching() > 0;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div
        className={cn(
          "w-full bg-gray-100 h-screen",
          isFetching ? "overflow-hidden" : "overflow-y-auto"
        )}
      >
        {children}
      </div>
    </>
  );
}

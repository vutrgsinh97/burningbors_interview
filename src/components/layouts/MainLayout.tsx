import { ReactNode } from "react";
import AppHeader from "../global/header";
import { useIsFetching } from "@tanstack/react-query";
import { cn } from "@/libs/utils";
import Head from "next/head";

export default function MainLayout({
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
      <div className="flex flex-col h-screen">
        <div className="w-full shrink-0 border-b border-b-gray-300">
          <div className="app-container">
            <AppHeader />
          </div>
        </div>
        <div
          className={cn(
            "w-full flex-1 bg-gray-100",
            isFetching ? "overflow-hidden" : "overflow-y-auto"
          )}
        >
          <div className="app-container">{children}</div>
        </div>
      </div>
    </>
  );
}

import React from "react";
import MainCategory from "@/app/MainCategory/page";

type Props = {
  children: React.ReactNode;
};

function MainCategoryLayout({ children }: Props) {
  return (
    <div className="flex">
      {/* @ts-ignore */}
      <MainCategory />
      <div className="w-full">{children}</div>
    </div>
  );
}

export default MainCategoryLayout
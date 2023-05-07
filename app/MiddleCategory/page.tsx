"use client"

import React from "react";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import AddMiddleCategory from "@/components/MiddleCategory/AddMiddleCategory";
import MiddleCategoryList from "@/components/MiddleCategory/MiddleCategoryList";
import {QueryClientProvider} from "@tanstack/react-query";
import {QueryClient} from "@tanstack/query-core";

type Props = {
}

const queryClient = new QueryClient();

//async function MainCategoryPage({}: Props) {
const MiddleCategoryPage = () => {




  return (
    <div>
      <div style={{ justifyContent: "center", padding: "10px"}}>
        <h1 className='text-2xl font-bold'>중분류 코드 목록</h1>
      </div>
      <div className="justify-center">
        <QueryClientProvider client={queryClient}>
          <AddMiddleCategory />
          <MiddleCategoryList    />
          <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
      </div>
    </div>
  )
}

export default MiddleCategoryPage


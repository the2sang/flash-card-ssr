"use client"

import AddMainCategory from "@/components/MainCategory/AddMainCategory";
import MainCategoryList from "@/components/MainCategory/MainCategoryList";
import React from "react";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider} from "@tanstack/react-query";

type Props = {
}

const queryClient = new QueryClient();

//async function MainCategoryPage({}: Props) {
const MainCategoryPage = () => {


  return (
    <>
    <div style={{width: "500px", justifyContent: "center", padding: "10px"}}>
        <h1 className='text-2xl font-bold'>대분류 코드 목록</h1>
    </div>
    <div className="justify-center">
      <QueryClientProvider client={queryClient}>
        <AddMainCategory />
        <MainCategoryList    />
        <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
    </div>
    </>
  )
}

export default MainCategoryPage


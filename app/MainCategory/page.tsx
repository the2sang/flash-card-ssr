"use client"

import AddMainCategory from "@/components/MainCategory/AddMainCategory";
import MainCategoryList from "@/components/MainCategory/MainCategoryList";
import React, {FC} from "react";
import useMainCategorys from "@/hook/useMainCategorys";
import {dehydrate, QueryClient} from "@tanstack/query-core";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import Hydrate from "@/app/QueryHydrate";

type Props = {
}

//async function MainCategoryPage({}: Props) {
const MainCategoryPage: FC<Props> = async ({}: Props) => {

  // const queryClient = new QueryClient({
  //   defaultOptions: {
  //     queries: {
  //       refetchOnWindowFocus: false,
  //       refetchOnMount: false,
  //       retry: false,
  //       enabled: false,
  //     }
  //   }
  // });
  //
  // const dehydratedState = dehydrate(queryClient)
  //
  // console.log(queryClient);
  //
  // const { data, isLoading, isError } = useMainCategorys();
  //
  // //console.log(data);
  //
  // if (isLoading) {
  //   return <span>Loading...</span>
  // }
  // if (isError) {
  //   return <span>Error: {isError.message}</span>
  // }

  return (
    <>
    <div style={{width: "500px", justifyContent: "center", padding: "10px"}}>
        <h1 className='text-2xl font-bold'>대분류 코드 목록</h1>
    </div>
    <div className="justify-center">
      <AddMainCategory />
      <MainCategoryList  />
      <ReactQueryDevtools initialIsOpen />
    </div>
    </>
  )
}

export default MainCategoryPage


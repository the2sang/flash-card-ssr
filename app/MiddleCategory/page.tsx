"use client"

import React from "react";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import AddMiddleCategory from "@/components/MiddleCategory/AddMiddleCategory";
import MiddleCategoryList from "@/components/MiddleCategory/MiddleCategoryList";

type Props = {
}

//async function MainCategoryPage({}: Props) {
const MiddleCategoryPage = () => {


  return (
    <div>
      <div style={{ justifyContent: "center", padding: "10px"}}>
        <h1 className='text-2xl font-bold'>중분류 코드 목록</h1>
      </div>
      <div className="justify-center">
        <AddMiddleCategory />
        <MiddleCategoryList    />
        <ReactQueryDevtools initialIsOpen />
      </div>
    </div>
  )
}

export default MiddleCategoryPage


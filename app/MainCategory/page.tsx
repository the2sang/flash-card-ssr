"use client"

import AddMainCategory from "@/components/MainCategory/AddMainCategory";
import MainCategoryList from "@/components/MainCategory/MainCategoryList";
import {FC} from "react";
import {TMainCategorys} from "@/types/types";
import useMainCategorys from "@/hook/useMainCategorys";

type Props = {}

//async function MainCategoryPage({}: Props) {
const MainCategoryPage: FC<Props> = async ({}: Props) => {

  const { data, isLoading, error } = useMainCategorys<TMainCategorys>()

  // const maincategorys = await getAllMainCategory();
  console.log(data);

  return (
    <div style={{width: "500px", height: "700px", display: "flex", justifyContent: "center", padding: "10px"}}>
      <div className='flex justify-center py-10'>
        <h1 className='text-2xl font-bold'>대분류 코드 목록</h1>
        <AddMainCategory />
      </div>
      <MainCategoryList mainCategorys={data} />
    </div>
  )
}

export default MainCategoryPage


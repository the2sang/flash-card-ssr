import {TMainCategorys} from "@/types/types"
import MainCategory from "./MainCategory";
import {QueryClient} from "@tanstack/query-core"
import axios from "axios";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import React from "react";
import {getAllMainCategory} from "@/app/api/mainCategoryApi";

interface MainCategoryListProps {
  mainCategorys: TMainCategorys
}

// async function fetchData(param:number = 1) {
//   const {data} = await axios.get("http://localhost:8080/api/mainCategory/all", {
//
//   })
//   // const {data} = await getAllMainCategory();
//   //console.log(data);
//   return data;
// }

const MainCategoryList = () => {

  const queryClient: QueryClient = useQueryClient();

  const { status, data, error, isFetching, isPreviousData} = useQuery({
    queryKey: ['mainCategorys'],
    queryFn: () => getAllMainCategory(),
    keepPreviousData: true,
    // cacheTime: 1000,
    // staleTime: 1000,

  });

  React.useEffect(() => {
    if (!isPreviousData && data?.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ['mainCategorys'],
        queryFn: () => getAllMainCategory(),
        // staleTime: 1000,
      })
    }
  }, [data, isPreviousData, queryClient])

  const [saveMainCategory, setSaveMainCategory] = React.useState<TMainCategorys>();

  const resetData = async () => {
    const result =  await getAllMainCategory();
    setSaveMainCategory(result);
    console.log(result);

  }



  return (
    <>
    <div className="flex-auto m-5">
      <table className="table w-full">
        {/* head */}
        <thead>
        <tr>
          <th className="text-blue-500 text-lg">대분류 코드</th>
          <th className="text-blue-500 text-lg">실행</th>
        </tr>
        </thead>
        <tbody>

        {data?.list.map((mainCategory) => (
          <MainCategory id={mainCategory.id} key={mainCategory.id} mainCategory={mainCategory} />
        ))}
        </tbody>
      </table>
    </div>
      {/*<div className="flex justify-center pr-24 pl-24">*/}
      {/*  <button className='btn btn-primary w-full m-5 mr-5' onClick={() => resetData()} >가져오기</button>*/}
      {/*</div>*/}
    </>
  );
};

export default MainCategoryList;
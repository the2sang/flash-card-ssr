import {TMiddleCategorys} from "@/types/types"
import MiddleCategory from "./MiddleCategory";
import {QueryClient} from "@tanstack/query-core"
import {useQuery, useQueryClient} from "@tanstack/react-query";
import React  from "react";
import {getAllMiddleCategory} from "@/app/api/middleCategoryApi";

interface CategoryProps {
  middleCategorys: TMiddleCategorys
}


const MiddleCategoryList = () => {

  const queryClient: QueryClient = useQueryClient();

  const { status, data, error, isFetching, isPreviousData} = useQuery({
    queryKey: ['middleCategorys'],
    queryFn: () => getAllMiddleCategory(),
    keepPreviousData: true,
    // cacheTime: 1000,
    // staleTime: 1000,
  });



  if (status === "loading") return <h1>Loading...</h1>
  if (status === "error") {
    return <h1>{JSON.stringify(error)}</h1>
  }

  return (
    <>
    <div className="flex-auto m-5">
      <table className="table w-full">
        {/* head */}
        <thead>
        <tr>
          <th className="text-blue-500 text-lg">중분류</th>
          <th className="text-blue-500 text-lg">대분류</th>
          <th className="text-blue-500 text-lg">실행</th>
        </tr>
        </thead>
        <tbody>

        {data?.list.map((middleCategory) => (
          <MiddleCategory id={middleCategory.id} key={middleCategory.id} middleCategory={middleCategory} />
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

export default MiddleCategoryList;
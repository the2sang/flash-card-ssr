import {TMainCategorys} from "@/types/types"
import MainCategory from "./MainCategory";
import Hydrate from "@/app/QueryHydrate"
import {dehydrate, QueryClient} from "@tanstack/query-core"
import axios from "axios";
import mainCategory from "./MainCategory";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import React from "react";

interface MainCategoryListProps {
  mainCategorys: TMainCategorys
}

async function fetchData(param:number = 1) {
  const {data} = await axios.get("http://localhost:8080/api/mainCategory/all")
  //console.log(data);
  return data;
}

const MainCategoryList = () => {

  const queryClient: QueryClient = useQueryClient();

  const { status, data, error, isFetching, isPreviousData} = useQuery({
    queryKey: ['mainCategorys'],
    queryFn: () => fetchData(),
    keepPreviousData: true,
    //staleTime: 2000,
  });

  React.useEffect(() => {
    if (!isPreviousData && data?.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ['mainCategorys'],
        queryFn: () => fetchData(),
      })
    }
  }, [data, isPreviousData, queryClient])


  return (
    <>
    <div className="flex-auto justify-center m-10">
      <table className="table w-full">
        {/* head */}
        <thead>
        <tr>
          <th>대분류 코드</th>
          <th>실행</th>
        </tr>
        </thead>
        <tbody>

        {data?.list.map((mainCategory) => (
          <MainCategory key={mainCategory.id} mainCategory={mainCategory} />
        ))}
        </tbody>
      </table>
    </div>
      <div className="flex justify-center m-10">
        <button className='btn btn-primary w-full m-5 mr-5' onClick={() => fetchData()} >가져오기</button>
      </div>
    </>
  );
};

export default MainCategoryList;
import {TMemoryCard, TMemoryCards} from "@/types/types"
import MemoryCard from "./MemoryCard";
import {QueryClient} from "@tanstack/query-core"
import axios from "axios";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import React  from "react";
import {getAllMemoryCard, getAllMemoryCardPage} from "@/app/api/memoryCardApi";
import Pagination from "@/components/Pagination";
import {useRouter} from "next/router";
import { useFetch} from "usehooks-ts";

interface CategoryProps {
  memoryCards: TMemoryCards
}


const MemoryCardList = () => {

  //const router = useRouter()

  const queryClient: QueryClient = useQueryClient();

  const[page, setPage] = React.useState(0);

  const { status, data, error, isFetching, isPreviousData} = useQuery({
    queryKey: ['memoryCards', page],
    queryFn: () => getAllMemoryCardPage(page) ,
    keepPreviousData: true,
    staleTime: 3000,
    // cacheTime: 1000,
    // staleTime: 1000,
  });

  React.useEffect(() => {
    if(isPreviousData && data?.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ['memoryCards', page + 1],
        queryFn: () => getAllMemoryCard(),
      })
    }
  }, [data, isPreviousData, page,queryClient])

  if (status === "loading") return <h1>Loading...</h1>
  if (status === "error") {
    return <h1>{JSON.stringify(error)}</h1>
  }


  return (
    <>
    <div className="flex-auto m-5">
      {/*<p>{console.log(JSON.stringify(data))}</p>*/}
      {/*<Pagination page={1} perPage={10} itemCount={data?.list.length}/>*/}
      <table className="table w-full">
        {/* head */}
        <thead>
        <tr>
          <th className="text-blue-500 text-lg">질문</th>
          <th className="text-blue-500 text-lg">실행</th>
        </tr>
        </thead>
        <tbody>

        {data?.list.map((memoryCard) => (
          <MemoryCard  key={memoryCard.id} memoryCard={memoryCard} />
        ))}
        </tbody>
      </table>
      <div className="flex rounded bg-white mt-3">
        <div className="flex text-lg text-left">현재 페이지: {page + 1}</div>
        <div className="flex m-1">
          <div className="flex">
            <button className="input input-bordered w-full"
                    onClick={() => setPage((old) => Math.max(old - 1, 0))}
                    disabled={page === 0}
            >
              Previous
            </button>{' '}
          </div>
          <div className="flex">
            <button className="input input-bordered w-full"
                    onClick={() => {
                      setPage((old) => (data?.hasMore ? old + 1 : old))
                    }}
                    disabled={isPreviousData || !data?.hasMore}
            >
              Next
            </button>
          </div>
        </div>


       </div>
      </div>
      <div className="text-lg">
        {
          // Since the last page's data potentially sticks around between page requests,
          // we can use `isFetching` to show a background loading
          // indicator since our `status === 'loading'` state won't be triggered
          isFetching ? <span> Loading...</span> : null
        }{' '}
    </div>
      {/*<div className="flex justify-center pr-24 pl-24">*/}
      {/*  <button className='btn btn-primary w-full m-5 mr-5' onClick={() => resetData()} >가져오기</button>*/}
      {/*</div>*/}
    </>
  );
};

export default MemoryCardList;
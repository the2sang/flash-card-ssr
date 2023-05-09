import {TMemoryCard, TMemoryCardAdd, TMemoryCards} from "@/types/types"
import MemoryCard from "./MemoryCard";
import {QueryClient} from "@tanstack/query-core"
import axios from "axios";
import {QueryClientProvider, useQuery, useQueryClient} from "@tanstack/react-query";
import React, {useState} from "react";
import {getAllMemoryCard, getAllMemoryCardPage} from "@/app/api/memoryCardApi";
import Pagination from "@/components/Pagination";
import {useRouter} from "next/router";
import { useFetch} from "usehooks-ts";

interface CategoryProps {
  memoryCards: TMemoryCards
  memoryCard: TMemoryCardAdd
}

const queryClient = new QueryClient()





export default function MemoryCardPageList() {
  return (
          <QueryClientProvider client={queryClient}>
            <MemoryCardNewList />
          </QueryClientProvider>
      )
}



const MemoryCardNewList = () => {

  //const router = useRouter()

  const queryClient: QueryClient = useQueryClient();
  const[page, setPage] = React.useState(0);

  const [hasMore, setHasMore] = React.useState<boolean>(true);

  async function fetchMemoryCards(page = 0) {
    const { data } = await axios.get(`http://localhost:8080/api/memoryCard/next?page=${page}`)

    setHasMore(page < 9 ? true : false)
    return data;
  }

  const { status, data, error, isFetching, isPreviousData } = useQuery({
    queryKey: ['memoryCards', page],
    queryFn: () => fetchMemoryCards(page),
    keepPreviousData: true,
    staleTime: 2000,
  })

  // Prefetch the next page!
  React.useEffect(() => {
    if (!isPreviousData && hasMore) {
      queryClient.prefetchQuery({
        queryKey: ['memoryCards', page + 1],
        queryFn: () => fetchMemoryCards(page + 1),
      })
    }
  }, [data, isPreviousData, page, queryClient])


  return (
    <>
    <div className="justify-center m-5">
      {/*<p>{console.log(JSON.stringify(data))}</p>*/}
      {/*<Pagination page={1} perPage={10} itemCount={data?.list.length}/>*/}
      <table className="table table-compact">
        {/* head */}
        <thead>
        <tr>
          <th className="text-blue-500 text-lg">질문</th>
          <th className="text-blue-500 text-lg">실행</th>
        </tr>
        </thead>
        <tbody>
        {/*{data}*/}
        {data?.list.map((memoryCard) => (
              <MemoryCard  key={memoryCard.id} id={memoryCard.id} memoryCard={memoryCard} />

        ))}
        </tbody>
      </table>
      <div className="flex rounded bg-white mt-3">
        <div className="flex m-3 text-lg text-left">현재 페이지: {page + 1}</div>
        <div className="flex m-3">
          <button className="input input-bordered btn-sm w-full"
                  onClick={() => setPage((old) => Math.max(old - 1, 0))}
                  disabled={page === 0}
          >
            Previous
          </button>{' '}
        </div>
        <div className="flex m-3">
          <button className="input input-bordered btn-sm w-full"
                  onClick={() => {
                    setPage((old) => (hasMore ? old + 1 : old))
                  }}
                  disabled={isPreviousData || !hasMore}
          >
            Next
          </button>
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

//export default MemoryCardNewList;
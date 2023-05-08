import {TMemoryCard, TMemoryCards} from "@/types/types"
import MemoryCard from "./MemoryCard";
import {QueryClient} from "@tanstack/query-core"
import axios from "axios";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import React  from "react";
import {getAllMemoryCard} from "@/app/api/memoryCardApi";

interface CategoryProps {
  memoryCards: TMemoryCards
}


const MemoryCardList = () => {

  const queryClient: QueryClient = useQueryClient();

  const { status, data, error, isFetching, isPreviousData} = useQuery({
    queryKey: ['memoryCards'],
    queryFn: () => getAllMemoryCard(),
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
      {/*<p>{console.log(JSON.stringify(data))}</p>*/}
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
    </div>
      {/*<div className="flex justify-center pr-24 pl-24">*/}
      {/*  <button className='btn btn-primary w-full m-5 mr-5' onClick={() => resetData()} >가져오기</button>*/}
      {/*</div>*/}
    </>
  );
};

export default MemoryCardList;
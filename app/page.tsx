import getQueryClient from "./getQueryClient"
import Hydrate from "./QueryHydrate"
import { dehydrate } from "@tanstack/query-core"
import {getMemoryCards} from "@/app/api/memoryCardApi";
import React from "react";
import MyCards from "@/components/MyCards";


type ParamProps = {
  param: number | 1;
}


export default async function Home() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(["cards"], () => {

    const cards = getMemoryCards(1)
    return cards;
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <main>
      <Hydrate state={dehydratedState}>
        {/*<PostForm />*/}
        {/*<Posts />*/}
        <MyCards />
      </Hydrate>
    </main>
  )
}
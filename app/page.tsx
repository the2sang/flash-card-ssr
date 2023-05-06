import getQueryClient from "./getQueryClient"
import Hydrate from "./QueryHydrate"
import { dehydrate } from "@tanstack/query-core"
import {getMemoryCards} from "@/app/api/memoryCardApi";
import React from "react";
import MyCards from "@/components/MyCards";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";


export default async function Home() {
  const queryClient = getQueryClient();
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

        <MyCards param={1}   />

      </Hydrate>
      <ReactQueryDevtools initialIsOpen />
    </main>
  )
}
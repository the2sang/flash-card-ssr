import getQueryClient from "./getQueryClient"
import Hydrate from "./QueryHydrate"
import { dehydrate } from "@tanstack/query-core"
import {getMemoryCards} from "@/app/api/memoryCardApi";
import {MemoryCards} from "@/types/types";

// import Posts from "@/components/Posts"
// import PostForm from "@/components/PostForm"

type ParamProps = {
  param: number | 1;
}

// export const fetchData = async ({param = 1}: ParamProps ) : Promise<MemoryCards> => {
//   const data = await getMemoryCards( param);
//   console.log(data)
//   return data;
// };

export default async function Home() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(["cards"], () => getMemoryCards(1))
  const dehydratedState = dehydrate(queryClient)

  return (
    <main>
      <Hydrate state={dehydratedState}>
        {/*<PostForm />*/}
        {/*<Posts />*/}

      </Hydrate>
    </main>
  )
}
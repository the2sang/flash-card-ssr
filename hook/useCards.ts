import { useQuery } from "@tanstack/react-query"
import {TMemoryCards} from "@/types/types";

const useCards : TMemoryCards  = ( param: number)  => {
  return useQuery<TMemoryCards>({
    queryKey: ["cards"],
    queryFn: () =>
      fetch(`http://localhost:8080/api/memorycard/middlecode?param=${param}`)
        .then((res) => res.json())
        .catch((error) => {
          throw new Error(error.message)
        }),
  })
}

export default useCards
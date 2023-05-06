import { useQuery } from "@tanstack/react-query"
import {MemoryCards} from "@/types/types";

const useCards : MemoryCards  = ( param: number) => {
  return useQuery<MemoryCards>({
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
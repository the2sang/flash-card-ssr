import { useQuery } from "@tanstack/react-query"
import { MemoryCards } from "@/types/types";

const useCards = () => {
  return useQuery<MemoryCards[]>({
    queryKey: ["cards"],
    queryFn: () =>
      fetch("http://localhost:8080/api/memorycard/middlecode?param=1")
        .then((res) => res.json())
        .catch((error) => {
          throw new Error(error.message)
        }),
  })
}

export default useCards
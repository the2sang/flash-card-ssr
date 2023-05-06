import { useQuery } from "@tanstack/react-query"
import {TMainCategorys} from "@/types/types";

const useMainCategorys: TMainCategorys  = ( ) => {
  return useQuery<TMainCategorys>({
    queryKey: ["maincategorys"],
    queryFn: () =>
      fetch("http://localhost:8080/api/mainCategory/middlecode/all")
        .then((res) => res.json())
        .catch((error) => {
          throw new Error(error.message)
        }),
  })
}

export default useMainCategorys
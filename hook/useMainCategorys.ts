import { useQuery } from "@tanstack/react-query"
import {TMainCategory, TMainCategorys} from "@/types/types";



const useMainCategorys: () => Promise<TMainCategorys | unknown>  = async ( ): Promise<TMainCategorys | unknown> => {


  return useQuery<TMainCategorys>({
    queryKey: ["maincategorys"],
    queryFn: () =>  fetch("http://localhost:8080/api/mainCategory/all", {next: {revalidate: 60}})
        .then((res) => res.json())
        .catch((error) => {
          throw new Error(error.message)
        }),
    retry: false,
    enabled: false,
  })
}

export default useMainCategorys
import {MemoryCardSearchParam, SelectOption, TMemoryCard, TMemoryCardAdd, TMemoryCards} from "@/types/types"
import MemoryCard from "./MemoryCard";
import {QueryClient} from "@tanstack/query-core"
import axios from "axios";
import {QueryClientProvider, useQuery, useQueryClient} from "@tanstack/react-query";
import React, {useRef, useState} from "react";
import {getAllMemoryCard, getAllMemoryCardPage, searchMemoryCard} from "@/app/api/memoryCardApi";
import Pagination from "@/components/Pagination";
import {useRouter} from "next/router";
import { useFetch} from "usehooks-ts";
import {Button} from "@/components/common/Button";
import {getMainCategorySelect} from "@/app/api/mainCategoryApi";
import {getMiddleCategoryByMainCatId} from "@/app/api/middleCategoryApi";

interface CategoryProps {
  memoryCards: TMemoryCards
  memoryCard: TMemoryCardAdd
}

const queryClient = new QueryClient()

export default function MemoryCardPageList() {
  return (
      // <QueryClientProvider client={queryClient}>
      <>
        <SearchBox />
        <MemoryCardNewList />
      </>

      // </QueryClientProvider>
  )
}


const SearchBox = () => {


  const searchQuestionRef = useRef<HTMLInputElement | null>(null)
  const mainCategoryIdRef = useRef<HTMLSelectElement | null>(null)
  const mainCategoryOptionRef = useRef<HTMLOptionElement | null>(null)

  const middleCategoryIdRef = useRef<HTMLSelectElement | null>(null)
  const [mainCategoryId, setMainCategoryId] = useState<string>("1")

  const [middleCategorySelectData, setMiddleCategorySelectData] = useState<SelectOption[]>()

  const [middleCategorySearch, setMiddleCategorySearch] = useState<string>("");

  const [showEx, setShowEx] = useState<boolean>(false)

  const [toggle, setToggle] = useState<boolean>(false)

  async function fetchMemoryCards(page = 0) {
    const { data } = await axios.get(`http://localhost:8080/api/memoryCard/next?page=${page}`)
    let totalPages:number = data.page.totalPages
    let pageCount = page * 10
    return data;
  }

  function showExplanation(e: React.KeyboardEvent<HTMLInputElement>) {
    e.preventDefault()
    //alert("hi")

    setShowEx(true)
    // e.target.visible = true
  }

  //대분류 검색 코드 가져오기
  const mainCategorySelectQuery = useQuery({
    queryKey: ['mainCategorySelect'],
    queryFn: () => getMainCategorySelect()
  });

  if (mainCategorySelectQuery.status === "loading") return <h1>Loading...</h1>
  if (mainCategorySelectQuery.status === "error") {
    return <h1>{JSON.stringify(mainCategorySelectQuery.error)}</h1>
  }


  const selectMiddleCategoryByMain = async (id: number = 1 ) => {


    return await getMiddleCategoryByMainCatId(id)
  }

  async function selectMiddleCategoryByMainCat(id = 0 ) {
    const { data } = await axios.get(`http://localhost:8080/api/middleCategory/byMainCategory?id=${id}`)
    //let totalPages:number = data.page.totalPages
    //let pageCount = page * 10
    //setMiddleCategorySelect(data?.list)
    setMiddleCategorySelectData(data?.list)
    return data;
  }


  async function selectMainCategoryHandle(e:React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault()
    //alert(e.target.value)
    //setMainCategorySelectOption(e.target.value)
    //const param = mainCategoryOptionRef.current?.value!
    console.log(e.target.value)
    setMiddleCategorySearch(e.target.value)
    const result = await  selectMiddleCategoryByMainCat(Number(e.target.value))
    // setMainCategorySelectOption("")
    //console.log(result)
    // alert(result.list.length())
  }

  const searchMemoryCardHandle = async () => {

    //TODO 메모리카드 검색하기 - AddMemoryCard
    // const result = await
    const param: MemoryCardSearchParam = {
      middleCategoryId: middleCategorySearch,
      size: 10,
      page: 0,

    }
    const result = await searchMemoryCard(param)
    console.log(result)

  }

  return (
      <>
        <div className="flex flex-col justify-start ml-5">
          <div className="grid h-20 bg-white rounded-box place-items-start max-w-fit">
            <div className="flex mt-5 ">
              <select onChange={(event) => selectMainCategoryHandle(event)} ref={mainCategoryIdRef} className="select select-bordered select-sm ml-3 mt-0.5">
                <option disabled selected>대분류</option>
                {mainCategorySelectQuery.data?.list.map((option: SelectOption) => (
                    <option ref={mainCategoryOptionRef}  value={option.value}>{option.label}</option>
                ))}
              </select>
              <select className="select select-bordered select-sm ml-3 mt-0.5">
                <option disabled selected>중분류</option>
                {middleCategorySelectData?.map((option: SelectOption) => (
                    <option ref={middleCategoryIdRef} value={option.value}>{option.label}</option>
                ))}
              </select>
              <select className="select select-bordered select-sm ml-3 mt-0.5">
                <option disabled selected>문제 난이도</option>
                <option>상</option>
                <option>중</option>
                <option>하</option>
              </select>
              <svg width="25px" onClick={()=> setToggle(!toggle) } height="25px" className="ml-3 mt-2 duration-200 cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.29289 1.29289C9.48043 1.10536 9.73478 1 10 1H18C19.6569 1 21 2.34315 21 4V8C21 8.55228 20.5523 9 20 9C19.4477 9 19 8.55228 19 8V4C19 3.44772 18.5523 3 18 3H11V8C11 8.55228 10.5523 9 10 9H5V20C5 20.5523 5.44772 21 6 21H10C10.5523 21 11 21.4477 11 22C11 22.5523 10.5523 23 10 23H6C4.34315 23 3 21.6569 3 20V8C3 7.73478 3.10536 7.48043 3.29289 7.29289L9.29289 1.29289ZM6.41421 7H9V4.41421L6.41421 7ZM20.1716 18.7574C20.6951 17.967 21 17.0191 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21C17.0191 21 17.967 20.6951 18.7574 20.1716L21.2929 22.7071C21.6834 23.0976 22.3166 23.0976 22.7071 22.7071C23.0976 22.3166 23.0976 21.6834 22.7071 21.2929L20.1716 18.7574ZM13 16C13 14.3431 14.3431 13 16 13C17.6569 13 19 14.3431 19 16C19 17.6569 17.6569 19 16 19C14.3431 19 13 17.6569 13 16Z" fill="#000000"/>
              </svg>
              {toggle && <input type="text" placeholder="질문 내용 검색" id="searchQuestion"
                                className="input input-bordered input-sm w-56 ml-3" />}
              <div className="form-control ml-3">
                <label className="cursor-pointer label" htmlFor="completedCheck">
                  <span className="label-text text-sm mr-2">완료구분</span>
                  <input type="checkbox" id="completedCheck" defaultChecked={false} className="checkbox checkbox-info" />
                </label>
              </div>
              <Button onClick={()=> searchMemoryCardHandle()} className="btm-sm rounded-box ml-5 mr-5">검색하기</Button>
            </div>

          </div>
        </div>

      </>
  )
}



const MemoryCardNewList = () => {

  //const router = useRouter()

  const queryClient: QueryClient = useQueryClient();
  const[page, setPage] = React.useState(0);

  const [hasMore, setHasMore] = React.useState<boolean>(true);

  async function fetchMemoryCards(page = 0) {
    const { data } = await axios.get(`http://localhost:8080/api/memoryCard/next?page=${page}`)
    //const data = await getAllMemoryCardPage(page)
    let totalPages:number = data.page.totalPages
    let pageCount = page * 10
    console.log(data)
    //alert(data.page.totalElements)
    // setHasMore(page < data.page.size ? true : false)
    setHasMore(page < totalPages ? true : false)
    return data;
  }

  const { status, data, error, isFetching, isPreviousData } = useQuery({
    queryKey: ['memoryCards', page],
    queryFn: () => fetchMemoryCards(page),
    keepPreviousData: true,
    staleTime: 1000,
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
            {data?.page.content.map((memoryCard) => (
                <React.Fragment key={memoryCard.id}>
                  <MemoryCard  key={memoryCard.id} id={memoryCard.id} memoryCard={memoryCard} />
                </React.Fragment>
            ))}
            </tbody>
          </table>
          <div className="flex rounded bg-white mt-3">
            <div className="flex m-3 text-lg text-left mt-5">현재 페이지: {page + 1}</div>
            <div className="flex mt-3 mb-3">
              <Button className="rounded-s-lg self-start"
                      onClick={() => setPage((old) => Math.max(old - 1, 0))}
                      disabled={page === 0}
              >
                Previous
              </Button>{' '}
            </div>
            <div className="flex mt-3 mb-3 ml-1">
              <Button className="rounded-e-lg"
                      onClick={() => {
                        setPage((old) => (hasMore ? old + 1 : old))
                      }}
                      disabled={isPreviousData || !hasMore}
              >
                Next
              </Button>
              {/*<Button className="self-end">Tweet</Button>*/}
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
  )
}

//export default MemoryCardNewList;
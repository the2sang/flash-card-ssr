import {
    MemoryCardSearchParam,
    SelectOption,
    TMemoryCard,
    TMemoryCardAdd,
    TMemoryCardPages,
    TMemoryCards
} from "@/types/types"
import MemoryCard from "./MemoryCard";
import {QueryClient} from "@tanstack/query-core"
import axios from "axios";
import {QueryClientProvider, useQuery, useQueryClient} from "@tanstack/react-query";
import React, {useCallback, useRef, useState} from "react";
import {getAllMemoryCard, getAllMemoryCardPage, searchMemoryCard} from "@/app/api/memoryCardApi";
import Pagination from "@/components/Pagination";
import {useRouter} from "next/router";
import { useFetch} from "usehooks-ts";
import {Button} from "@/components/common/Button";
import {getMainCategorySelect} from "@/app/api/mainCategoryApi";
import {getMiddleCategoryByMainCatId} from "@/app/api/middleCategoryApi";
import {AiOutlineFileSearch} from "react-icons/all";

interface CategoryProps {
    memoryCards: TMemoryCards
    memoryCard: TMemoryCardAdd
}

const queryClient = new QueryClient()

export default function MemoryCardPageList() {
    return (
        // <QueryClientProvider client={queryClient}>
        <>
            {/*<SearchBox />*/}
            <MemoryCardNewList />
        </>

        // </QueryClientProvider>
    )
}


const MemoryCardNewList = () => {

    //const router = useRouter()

    const queryClient: QueryClient = useQueryClient();
    const[page, setPage] = React.useState(0);

    const [hasMore, setHasMore] = React.useState<boolean>(true);

    const searchQuestionRef = useRef<HTMLInputElement | null>(null)
    const mainCategoryIdRef = useRef<HTMLSelectElement | null>(null)
    const mainCategoryOptionRef = useRef<HTMLOptionElement | null>(null)

    const middleCategoryIdRef = useRef<HTMLSelectElement | null>(null)
    const [mainCategoryId, setMainCategoryId] = useState<string>("1")

    const [middleCategorySelectData, setMiddleCategorySelectData] = useState<SelectOption[]>()

    const [middleCategorySearch, setMiddleCategorySearch] = useState<string>("")
    const [mainCategorySearch, setMainCategorySearch] = useState<string>("")

    const [showEx, setShowEx] = useState<boolean>(false)

    const [toggle, setToggle] = useState<boolean>(false)

    const [searchPageData, setSearchPageData] = useState<TMemoryCardPages>()


    // async function fetchMemoryCards(page = 0) {
    //     const { data } = await axios.get(`http://localhost:8080/api/memoryCard/next?page=${page}`)
    //     let totalPages:number = data.page.totalPages
    //     let pageCount = page * 10
    //     return data;
    // }

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

    const searchMemoryCardHandle =  async ( ) => {


        //alert('click')

        //TODO 메모리카드 검색하기 - AddMemoryCard
        // const result = await
        const param: MemoryCardSearchParam = {
            middleCategoryId: middleCategorySearch,
            mainCategoryId: mainCategorySearch,
            size: 10,
            page: 0,

        }
        const data
          = await axios.get(`http://localhost:8080/api/memoryCard/next/search?page=${ param.page}&mainCategoryId=${param.mainCategoryId}`)
        setSearchPageData(data.data)
        console.log(data)
        return {data};
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

    // async function selectMainCategoryHandle(e:React.ChangeEvent<HTMLSelectElement>) {
    const selectMainCategoryHandle = async (e:React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        //alert(e.target.value)
        //setMainCategorySelectOption(e.target.value)
        //const param = mainCategoryOptionRef.current?.value!
        console.log(e.target.value)
        setMainCategorySearch(e.target.value)

    }



    async function fetchMemoryCards(page = 0) {
        const { data } = await axios.get(`http://localhost:8080/api/memoryCard/next?page=${page}`)
        //const data = await getAllMemoryCardPage(page)
        let totalPages:number = data.page.totalPages
        let pageCount = page * 10
        console.log(data)
        //alert(data.page.totalElements)
        // setHasMore(page < data.page.size ? true : false)
        setHasMore(page < totalPages ? true : false)
        setSearchPageData(data)
        return data;
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
                        {/*<select className="select select-bordered select-sm ml-3 mt-0.5">*/}
                        {/*    <option disabled selected>중분류</option>*/}
                        {/*    {middleCategorySelectData?.map((option: SelectOption) => (*/}
                        {/*        <option ref={middleCategoryIdRef} value={option.value}>{option.label}</option>*/}
                        {/*    ))}*/}
                        {/*</select>*/}
                        <select className="select select-bordered select-sm ml-3 mt-0.5">
                            <option disabled selected>문제 난이도</option>
                            <option>상</option>
                            <option>중</option>
                            <option>하</option>
                        </select>
                        <label className="cursor-pointer label ml-2" htmlFor="qustionIcon">
                            <span className="label-text text-sm mr-2" onClick={()=>setToggle(!toggle)}>질문검색 보이기</span>
                        </label>
                        <AiOutlineFileSearch id="qustionIcon" className="ml-3 mt-2 duration-200 cursor-pointer" onClick={()=> setToggle(!toggle)} />
                        {toggle && <input type="text" placeholder="질문 내용 입력" id="searchQuestion"
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
                    { searchPageData === null ?  data?.page.content.map((memoryCard) => (
                        <React.Fragment key={memoryCard.id}>
                            <MemoryCard  key={memoryCard.id} id={memoryCard.id} memoryCard={memoryCard} />
                        </React.Fragment>
                    )) : searchPageData?.page?.content?.map((memoryCard) => (
                        <React.Fragment key={memoryCard.id}>
                            <MemoryCard  key={memoryCard.id} id={memoryCard.id} memoryCard={memoryCard} />
                        </React.Fragment>
                    ))}
                    {/*{}*/}
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
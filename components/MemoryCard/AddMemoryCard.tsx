"use client";

import { AiOutlinePlus } from "react-icons/ai";
import ModalForm from "@/components/ModalForm";
import React, {FormEventHandler, useRef, useState} from "react";
import {
  addMemoryCard,
  addMemoryCard2,
  editMemoryCard,
  getAllMemoryCardPage,
  searchMemoryCard
} from "@/app/api/memoryCardApi";
import { useRouter} from "next/navigation";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {MemoryCardSearchParam, SelectOption, TMainCategory, TMemoryCard, TMemoryCardAdd} from "@/types/types";
import {undefined} from "zod";
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import {Button} from "@/components/common/Button";
import axios from "axios";
import {getAllMainCategory, getMainCategorySelect} from "@/app/api/mainCategoryApi";
import {getMiddleCategoryByMainCatId, getMiddleCategorySelect} from "@/app/api/middleCategoryApi";
import {revalidatePath} from "next/cache";

interface CategoryProps {
  id: string | undefined;
  mainCategory: TMainCategory
}
const AddMemoryCard = () => {

  const showToastMessage = () => {
    toast.success('Success Notification !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };

  const queryClient = useQueryClient()
  const router  = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const questionRef = useRef<HTMLInputElement | null>(null)
  const explationRef = useRef<HTMLTextAreaElement | null>(null)
  const num1Ref = useRef<HTMLInputElement | null >(null)
  const num2Ref = useRef<HTMLInputElement | null>(null)
  const num3Ref = useRef<HTMLInputElement | null>(null)
  const num4Ref = useRef<HTMLInputElement | null>(null)
  const questionTeypRef = useRef<HTMLSelectElement | null>(null)
  const levelRef = useRef<HTMLSelectElement | null>(null)
  const rightAnswerRef = useRef<HTMLInputElement | null>(null)
  const rightAnswerNumRef = useRef<HTMLSelectElement | null>(null)
  const completionRef = useRef<HTMLInputElement | null>(null)
  const searchQuestionRef = useRef<HTMLInputElement | null>(null)
  const mainCategoryIdRef = useRef<HTMLSelectElement | null>(null)
  const mainCategoryOptionRef = useRef<HTMLOptionElement | null>(null)
  const middleCategoryIdRef = useRef<HTMLSelectElement | null>(null)
  const [mainCategoryId, setMainCategoryId] = useState<string>("1")
  const [middleCategorySelectData, setMiddleCategorySelectData] = useState<SelectOption[]>()
  const [middleCategorySearch, setMiddleCategorySearch] = useState<string>("");
  const [newCard, setNewCard] = useState<TMemoryCardAdd>()
  const cardFormRef = useRef<HTMLFormElement | null>(null)
  const [showEx, setShowEx] = useState<boolean>(false)
  const [toggle, setToggle] = useState<boolean>(false)

  //const [middleCategorySelectData, setMiddleCategorySelectData] = useState<SelectOption[]>()
  async function fetchMemoryCards(page = 0) {
    const { data } = await axios.get(`http://localhost:8080/api/memoryCard/next?page=${page}`)
    let totalPages:number = data.page.totalPages
    let pageCount = page * 10
    return data;
  }

  const createMemoryCardMutate = useMutation({
    mutationFn: () => addMemoryCard2(newCard as TMemoryCardAdd),
    onSuccess: data => {
      //clearData()
      //fetchMemoryCards(0)
      cardFormRef.current?.reset()
      showToastMessage()
      queryClient.setQueryData(["memoryCards"], data)
      queryClient.invalidateQueries(["memoryCards"], {exact: true})
      revalidatePath("/memoryCard")

    }
  })
  const setupData = (): TMemoryCardAdd => {
    const newMemoryCard : TMemoryCardAdd = {
      question: questionRef.current?.value!,
      questionType: questionTeypRef.current?.value!,
      completed: completionRef.current?.value!,
      level: levelRef.current?.value!,
      explanation: explationRef.current?.value!,
      num1: num1Ref.current?.value!,
      num2: num2Ref.current?.value!,
      num3: num3Ref.current?.value!,
      num4: num4Ref.current?.value!,
      rightAnswer: rightAnswerRef.current?.value!,
      rightAnswerNum: rightAnswerNumRef.current?.value!,
      learningCount: 0,
      middleCategoryId: Number(middleCategoryIdRef.current?.value!),
    }
    return newMemoryCard;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setNewCard(setupData)
    createMemoryCardMutate.mutate({
      newCard
    })
    router.refresh()
  }

  function saveNext(e: React.KeyboardEvent<HTMLInputElement>) {
    e.preventDefault()
    setNewCard(setupData)
    createMemoryCardMutate.mutate({
      newCard
    })

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
        <div className="justify-center ml-10 mr-10">
          <ToastContainer />
          <div className="flex w-36 self-end pb-5">
            <Button
                onClick={() => setModalOpen(true) }
                className='flex rounded-box btn-sm mt-3 w-full text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50'>
              문제 추가하기<AiOutlinePlus size={18} className='text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50' />
            </Button>
          </div>
          <ModalForm modalOpen={modalOpen} setModalOpen={setModalOpen} >
            <form onSubmit={handleSubmit} ref={cardFormRef} className="m-1 border-2 border-blue-50 p-5 m-10">
              <h4 className="font-bold text-lg">문제 추가하기</h4>
              <div className="modal-new-boxm-5 p-3 ">
                <div className="flex-col space-x-3 mb-2">
                  <label>
                    <span className="label-text">문제유형</span>
                  </label>
                  <select ref={questionTeypRef} className="select select-bordered select-sm ">
                    <option disabled >문제유형</option>
                    <option value={1} >주관식</option>
                    <option value={2} selected >객관식</option>
                  </select>
                  <label>
                    <span className="label-text">난이도</span>
                  </label>
                  <select ref={levelRef} className="select select-bordered select-sm">
                    <option disabled >난이도</option>
                    <option ref={levelRef} value={1}>상</option>
                    <option ref={levelRef} value={2} selected >중</option>
                    <option ref={levelRef}  value={3}>하</option>
                  </select>
                  {/*<label >*/}
                  {/*  <span className="label-text">정답</span>*/}
                  {/*</label>*/}
                  <label >
                    <span className="label-text">정답</span>
                  </label>
                  <input
                      id="rightAnswerNum"
                      name="rightAnswerNum"
                      type="text"
                      ref={rightAnswerNumRef}
                      placeholder="정답"
                      className="input input-sm input-bordered w-1/5"
                      list="answer"
                  />
                  <datalist id="answer">
                    <option ref={rightAnswerNumRef} value={1} />
                    <option ref={rightAnswerNumRef} value={2} />
                    <option ref={rightAnswerNumRef} value={3} />
                    <option ref={rightAnswerNumRef} value={4} />
                  </datalist>
                </div>
                {/*//TODO 중분류 코드 추가하기*/}
                <div className="mb-2">

                </div>
                <div className="mb-2" >
                  <label>
                    <span className="label-text">대분류</span>
                  </label>
                  <select onChange={(event) => selectMainCategoryHandle(event)} ref={mainCategoryIdRef} className="select select-bordered select-sm ml-3 mt-0.5">
                    <option disabled selected>대분류</option>
                    {mainCategorySelectQuery.data?.list.map((option: SelectOption) => (
                        <option ref={mainCategoryOptionRef}  value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  <label  className="ml-3">
                    <span className="label-text">중분류</span>
                  </label>
                  <select ref={middleCategoryIdRef}  className="select select-bordered select-sm ml-3 mt-0.5">
                    <option disabled selected>중분류</option>
                    {middleCategorySelectData?.map((option: SelectOption) => (
                        <option ref={middleCategoryIdRef} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-2">
                  <label >
                    <span className="label-text">질문</span>
                  </label>
                  <input
                      id="question"
                      name="question"
                      ref={questionRef}
                      type="text"
                      placeholder="Type hear"
                      className="input input-sm input-bordered w-full"
                  />
                </div>
                <div className="mb-2"   >
                  <label >
                    <span className="label-text" onClick={()=> {setShowEx(!showEx)}}  >부연 설명(if click then show)</span>
                  </label>
                  { showEx &&
                      <textarea
                          placeholder="부연설명"
                          ref={explationRef}
                          className="textarea textarea-bordered textarea-md w-full" />
                  }
                </div>
                <div className="mb-2">
                  <label >
                    <span className="label-text">문항1</span>
                  </label>
                  <input
                      id="num1"
                      name="num1"
                      ref={num1Ref}
                      type="text"
                      placeholder="Type hear"
                      className="input input-sm input-bordered w-full"
                  />
                </div>
                <div className="mb-2">
                  <label >
                    <span className="label-text">문항2</span>
                  </label>
                  <input
                      id="num2"
                      name="num2"
                      ref={num2Ref}
                      type="text"
                      placeholder="Type hear"
                      className="input input-sm  input-bordered w-full"
                  />
                </div>
                <div className="mb-2">
                  <label >
                    <span className="label-text">문항3</span>
                  </label>
                  <input
                      id="num3"
                      name="num3"
                      ref={num3Ref}
                      type="text"
                      placeholder="Type hear"
                      className="input input-sm input-bordered w-full"
                  />
                </div>
                <div className="mb-2">
                  <label >
                    <span className="label-text">문항4</span>
                  </label>
                  <input
                      id="num4"
                      name="num4"
                      ref={num4Ref}
                      type="text"
                      placeholder="Type hear"
                      className="input input-sm input-bordered w-full"
                  />
                </div>
                <div className="mb-2">
                  <label >
                    <span className="label-text">정답(단답형)</span>
                  </label>
                  <input
                      id="rightAnswer"
                      name="rightAnswer"
                      ref={rightAnswerRef}
                      type="text"
                      placeholder="Type hear"
                      className="input input-sm input-bordered w-full"
                  />
                </div>
                <div className="flex">
                  <div className="mb-2 mt-2">
                    <button type="submit" disabled={createMemoryCardMutate.isLoading} className="btn w-4/5">
                      {createMemoryCardMutate.isLoading ? "Loading..." : "Create"}
                    </button>
                  </div>

                </div>
              </div>
            </form>
            {/*<div className="mb-2 mt-2">*/}
            {/*  <button onClick={clearData}  disabled={createMemoryCardMutate.isLoading} className="btn w-4/5">*/}
            {/*    {createMemoryCardMutate.isLoading ? "Loading..." : "Next"}*/}
            {/*  </button>*/}
            {/*</div>*/}
          </ModalForm>
        </div>
      </>

  );
};

export default AddMemoryCard
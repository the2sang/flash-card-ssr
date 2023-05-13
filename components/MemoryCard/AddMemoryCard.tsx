"use client";

import { AiOutlinePlus } from "react-icons/ai";
import ModalForm from "@/components/ModalForm";
import React, {FormEventHandler, useRef, useState} from "react";
import {addMemoryCard, addMemoryCard2, editMemoryCard, getAllMemoryCardPage} from "@/app/api/memoryCardApi";
import { useRouter} from "next/navigation";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {TMainCategory, TMemoryCard, TMemoryCardAdd} from "@/types/types";
import {undefined} from "zod";
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import {Button} from "@/components/common/Button";
import axios from "axios";
import {getAllMainCategory, getMainCategorySelect} from "@/app/api/mainCategoryApi";
import {getMiddleCategoryByMainCatId} from "@/app/api/middleCategoryApi";

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

  const questionRef = useRef<HTMLInputElement>()
  const explationRef = useRef<HTMLTextAreaElement>()
  const num1Ref = useRef<HTMLInputElement>()
  const num2Ref = useRef<HTMLInputElement>()
  const num3Ref = useRef<HTMLInputElement>()
  const num4Ref = useRef<HTMLInputElement>()
  const questionTeypRef = useRef<HTMLSelectElement>()
  const levelRef = useRef<HTMLSelectElement>()
  const rightAnswerRef = useRef<HTMLInputElement>()
  const rightAnswerNumRef = useRef<HTMLSelectElement>()
  const completionRef = useRef<HTMLInputElement>()
  const searchQuestionRef = useRef<HTMLInputElement>()
  const mainCategoryIdRef = useRef<HTMLSelectElement>()
  const middleCategoryIdRef = useRef<HTMLSelectElement>()
  const [mainCategoryId, setMainCategoryId] = useState<string>("1")


  const [newCard, setNewCard] = useState<TMemoryCardAdd>()

  const cardFormRef = useRef<HTMLFormElement>()

  const [showEx, setShowEx] = useState<boolean>(false)

  const [toggle, setToggle] = useState<boolean>(false)

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
    }
  })
const setupData = (): TMemoryCardAdd => {
  const newMemoryCard : TMemoryCardAdd = {
    question: questionRef.current?.value,
    questionType: questionTeypRef.current?.value,
    completed: completionRef.current?.value,
    level: levelRef.current?.value,
    explanation: explationRef.current?.value,
    num1: num1Ref.current?.value,
    num2: num2Ref.current?.value,
    num3: num3Ref.current?.value,
    num4: num4Ref.current?.value,
    rightAnswer: rightAnswerRef.current?.value,
    rightAnswerNum: rightAnswerNumRef.current?.value,
    learningCount: 0,
    middleCategoryId: 1,
  }
  return newMemoryCard;
}

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setNewCard(setupData)

    createMemoryCardMutate.mutate({
      newCard
    })
    //console.log(newMemoryCard)
    //setNewMemoryCardValue("")
    // setModalOpen(false)
    router.refresh()
  }

  function saveNext(e: React.KeyboardEvent<HTMLInputElement>) {
    e.preventDefault()
    setNewCard(setupData)
    createMemoryCardMutate.mutate({
      newCard
    })
   // clearData();
   //  setModalOpen(true)
   //  router.refresh()
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

  async function getMiddleCategoryById(page = 0) {
    const { data } = await  getMiddleCategoryByMainCatId(page)
    return data;
  }

  //대분류 선색된 중분류 검색 코드 가져오기
  const middleCategorySelectQuery = useQuery({
    queryKey: ['middleCategorySelect', mainCategoryId],
    queryFn: () => getMiddleCategoryByMainCatId(mainCategoryId)
  });

  if (middleCategorySelectQuery.status === "loading") return <h1>Loading...</h1>
  if (middleCategorySelectQuery.status === "error") {
    return <h1>{JSON.stringify(middleCategorySelectQuery.error)}</h1>
  }


  async function selectMainCategoryHandle(e:React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault()
    const param = mainCategoryIdRef.current?.value
    setMainCategoryId(param)
    const result = await  getMiddleCategoryByMainCatId(param)
    alert(result.list.length())
  }

  return (
    <>
      <div className="justify-center ml-10 mr-10">
        <ToastContainer />
        <div className="flex flex-col justify-start">
          <div className="grid h-20 bg-white rounded-box place-items-start max-w-fit">
            <div className="flex mt-5 ">
              <select onChange={selectMainCategoryHandle} ref={mainCategoryIdRef} className="select select-bordered select-sm ml-3 mt-0.5">
                <option disabled selected>대분류</option>
                {mainCategorySelectQuery.data?.list.map((option) => (
                  <option ref={mainCategoryIdRef} value={option.value}>{option.label}</option>
                ))}
              </select>
              <select className="select select-bordered select-sm ml-3 mt-0.5">
                <option disabled selected>중분류</option>
                {middleCategorySelectQuery.data?.list.map((option) => (
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
              <Button className="btm-sm rounded-box ml-5 mr-5">검색하기</Button>
            </div>

          </div>
        </div>
        <div className="flex w-36 self-end">

          <Button
              onClick={() => setModalOpen(true) }
              className='flex rounded-box btn-sm mt-3 w-full text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50'>
            문제 추가하기<AiOutlinePlus size={18} className='text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50' />
          </Button>
        </div>
        <ModalForm modalOpen={modalOpen} setModalOpen={setModalOpen} >
          <form onSubmit={handleSubmit} ref={cardFormRef} className="m-1">
            <h3 className="font-bold text-lg">문제 추가하기</h3>
            <div className="modal-box">
              <div className="flex-col space-x-3 mb-2">
                <select ref={questionTeypRef} className="select select-bordered select-sm ">
                  <option disabled selected>문제유형</option>
                  <option value={1} >주관식</option>
                  <option value={2}>객관식</option>
                </select>
                <select ref={levelRef} className="select select-bordered select-sm">
                  <option disabled selected>난이도</option>
                  <option ref={levelRef} value={1}>상</option>
                  <option ref={levelRef} value={2}>중</option>
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
                    className="input input-sm input-bordered w-1/3"
                    list="answer"
                />
                <datalist id="answer">
                  <option ref={rightAnswerNumRef} value={1} />
                  <option ref={rightAnswerNumRef} value={2} />
                  <option ref={rightAnswerNumRef} value={3} />
                  <option ref={rightAnswerNumRef} value={4} />
                </datalist>
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
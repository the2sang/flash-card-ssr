"use client";

import { AiOutlinePlus } from "react-icons/ai";
import ModalForm from "@/components/ModalForm";
import React, {FormEventHandler, useRef, useState} from "react";
import {addMemoryCard, addMemoryCard2, editMemoryCard, getAllMemoryCardPage} from "@/app/api/memoryCardApi";
import { useRouter} from "next/navigation";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {TMainCategory, TMemoryCard, TMemoryCardAdd} from "@/types/types";
import {undefined} from "zod";
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import {Button} from "@/components/common/Button";
import axios from "axios";

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

  const nameRef = useRef<HTMLInputElement>()
  const queryClient = useQueryClient()
  const router  = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newMemoryCardValue, setNewMemoryCardValue] = useState<string>("");

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

  const [newCard, setNewCard] = useState<TMemoryCardAdd>()
  const cardFormRef = useRef<HTMLFormElement>()

  const [showEx, setShowEx] = useState<boolean>(false)

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
     alert("hi")

    setShowEx(true)
    // e.target.visible = true
  }


  return (
    <>
      <div className="justify-center ml-10 mr-10">
        <ToastContainer />
        <div className="flex flex-col justify-start">
          <div className="grid h-24 bg-white rounded-box place-items-start">
            <div className="flex mt-5 ">
              <p className="p-2 ml-2 text-blue-500 text-sm">검색조건</p>
              <select className="select select-bordered w-44 max-w-xs ml-3 mt-0.5">
                <option disabled selected>대분류</option>
                <option>리눅스 마스터 2급</option>
                <option>SQLD</option>
                <option>데이터분석기사</option>
              </select>
              <select className="select select-bordered w-44 max-w-xs ml-3 mt-0.5">
                <option disabled selected>중분류</option>
                <option>리눅스 마스터 2급</option>
                <option>SQLD</option>
                <option>데이터분석기사</option>
              </select>
              <select className="select select-bordered w-32 max-w-xs ml-3 mt-0.5">
                <option disabled selected>문제 난이도</option>
                <option>상</option>
                <option>중</option>
                <option>하</option>
              </select>
              <input type="text" placeholder="질문 내용 검색" className="input input-bordered input-info w-56 ml-3" />
              <div className="form-control ml-3">
                <label className="cursor-pointer label">
                  <span className="label-text text-md mr-2">완료구분</span>
                  <input type="checkbox" checked className="checkbox checkbox-info" />
                </label>
              </div>
              <button className="btn btn-outline ml-5">검색하기</button>
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
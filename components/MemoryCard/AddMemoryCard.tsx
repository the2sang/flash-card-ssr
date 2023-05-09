"use client";

import { AiOutlinePlus } from "react-icons/ai";
import ModalForm from "@/components/ModalForm";
import React, {FormEventHandler, useRef, useState} from "react";
import {addMemoryCard, addMemoryCard2, editMemoryCard} from "@/app/api/memoryCardApi";
import { useRouter} from "next/navigation";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {TMainCategory, TMemoryCard, TMemoryCardAdd} from "@/types/types";
// import {v4 as uuidv4} from "uuid";

interface CategoryProps {
  id: string | undefined;
  mainCategory: TMainCategory
}



const AddMemoryCard = () => {

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

  const [newCard, setNewCard] = useState<TMemoryCardAdd>();

  const createMemoryCardMutate = useMutation({
    mutationFn: () => addMemoryCard2,
    onSuccess: data => {
      queryClient.setQueryData(["memoryCard"], data)
      queryClient.invalidateQueries(["memoryCard"], {exact: true})
    }
  })

  // const newMemoryCard : TMemoryCardAdd = {
  //   question: questionRef,
  //   questionType: questionTeypRef,
  //   completed: completionRef,
  //   level: levelRef,
  //   explanation: explationRef,
  //   num1: num1Ref,
  //   num2: num2Ref,
  //   num3: num3Ref,
  //   num4: num4Ref,
  //   rightAnswer: "",
  //   rightAnswerNum: rightAnswerNumRef,
  //   learningCount: 0,
  //   middleCategoryId: 1,
  // }



  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    //const newMemoryCard: TMemoryCardAdd = {};


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
      rightAnswer: "",
      rightAnswerNum: rightAnswerNumRef.current?.value,
      learningCount: 0,
      middleCategoryId: 1,
    }
    // newCard?.question = questionRef.current?.value
    // newCard?.questionType = questionTeypRef.current?.value
    // newCard?.completed = completionRef.current?.value
    // newCard?.explanation = explationRef.current?.value
    // newCard.num1 = num1Ref.current?.value
    // newCard.num2 = num2Ref.current?.value
    // newCard.num3 = num3Ref.current?.value
    // nweCard.new4 = num4Ref.current?.value
    // newCard?.rightAnswer = rightAnswerRef.current?.value
    // newCard?.rightAnswerNum =rightAnswerNumRef.current?.value
    // newCard?.learningCount = 0
    // newCard?.middleCategoryId = 1


    createMemoryCardMutate.mutate({
      memoryCard: newMemoryCard
    })
    console.log(newMemoryCard)
    setNewMemoryCardValue("")
    setModalOpen(false)
    router.refresh()
  }


  return (
    <div className="justify-center ml-10 mr-10 mt-5 mb-5">
      <button
        onClick={() => setModalOpen(true) }
        className='btn btn-primary w-full pl-24 pr-24 mb-2.5'
      >
        문제 추가하기<AiOutlinePlus size={18} />
      </button>
      <ModalForm modalOpen={modalOpen} setModalOpen={setModalOpen} >
        <form onSubmit={handleSubmit} className="m-1">
          <h3 className="font-bold text-lg">문제 추가하기</h3>
          <div className="modal-box">
            {/*<label >*/}
            {/*  <span className="label-text">문제유형</span>*/}
            {/*</label>*/}
            {/*<input*/}
            {/*    id="questionType"*/}
            {/*    name="questionType"*/}
            {/*    type="text"*/}
            {/*    placeholder="Type hear"*/}
            {/*    className="input input-sm input-bordered w-full"*/}
            {/*/>*/}
            <div className="flex-col space-x-3 mb-2">
              <select ref={questionTeypRef} className="select select-bordered select-sm ">
                <option disabled selected>문제유형</option>
                <option value={1}>주관식</option>
                <option value={2}>객관식</option>
              </select>
              <select ref={levelRef} className="select select-bordered select-sm">
                <option disabled selected>난이도</option>
                <option ref={levelRef}>상</option>
                <option ref={levelRef}>중</option>
                <option ref={levelRef}>하</option>
              </select>
              {/*<label >*/}
              {/*  <span className="label-text">정답</span>*/}
              {/*</label>*/}
              <label >
                <span className="label-text">정답</span>
              </label>
              <input
                id="rightAnswer"
                name="rightAnswer"
                type="text"
                ref={rightAnswerNumRef}
                placeholder="정답"
                className="input input-sm input-bordered w-1/3"
                list="answer"
              />
              <datalist id="answer">
               <option ref={rightAnswerRef} value="1" />
                <option ref={rightAnswerRef} value="2" />
                <option ref={rightAnswerRef} value="3" />
                <option ref={rightAnswerRef} value="4" />
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
                <span className="label-text">부연 설명</span>
              </label>
              <textarea placeholder="부연설명" ref={explationRef} className="textarea textarea-bordered textarea-md w-full" ></textarea>
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
            <div className="flex">
              <div className="mb-2 mt-2">
                <button type="submit" disabled={createMemoryCardMutate.isLoading} className="btn w-4/5">
                  {createMemoryCardMutate.isLoading ? "Loading..." : "Create"}
                </button>
              </div>
              <div className="mb-2 mt-2">
                <button type="submit" disabled={createMemoryCardMutate.isLoading} className="btn w-4/5">
                  {createMemoryCardMutate.isLoading ? "Loading..." : "Next"}
                </button>
              </div>
            </div>

          </div>
        </form>
      </ModalForm>
    </div>
  );
};

export default AddMemoryCard
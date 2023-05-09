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
  const rightAnswer = useRef<HTMLInputElement>()
  const rightAnswerRef = useRef<HTMLInputElement>()
  const rightAnswerNumRef = useRef<HTMLSelectElement>()
  const completionRef = useRef<HTMLInputElement>()

  const [newCard, setNewCard] = useState<TMemoryCardAdd>();

  const createMemoryCardMutate = useMutation({
    mutationFn: () => addMemoryCard2(newCard as TMemoryCardAdd),
    onSuccess: data => {
      queryClient.setQueryData(["memoryCard"], data)
      queryClient.invalidateQueries(["memoryCard"], {exact: true})
    }
  })


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

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
    //console.log(newMemoryCard)

    setNewCard(newMemoryCard)

    createMemoryCardMutate.mutate({
      newMemoryCard
    })
    //console.log(newMemoryCard)
    //setNewMemoryCardValue("")
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
                <option ref={levelRef} value={1}>상</option>
                <option ref={levelRef} value={2}>중</option>
                <option ref={levelRef} value={3}>하</option>
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
            <div className="mb-2">
              <label >
                <span className="label-text">정답(단답형)</span>
              </label>
              <input
                id="rightAnswer"
                name="rightAnswer"
                ref={rightAnswer}
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
"use client";

import { AiOutlinePlus } from "react-icons/ai";
import ModalForm from "@/components/ModalForm";
import React, {FormEventHandler, useRef, useState} from "react";
import {addMemoryCard, editMemoryCard} from "@/app/api/memoryCardApi";
import { useRouter} from "next/navigation";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {TMemoryCard} from "@/types/types";
// import {v4 as uuidv4} from "uuid";

interface CategoryProps {
  id: string | undefined;
  mainCategory: TMemoryCard
}

const AddMemoryCard = () => {

  const nameRef = useRef<HTMLInputElement>()
  const queryClient = useQueryClient()
  const router  = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newMemoryCardValue, setNewMemoryCardValue] = useState<string>("");

  const createMemoryCardMutate = useMutation({
    mutationFn: addMemoryCard,
    onSuccess: data => {
      queryClient.setQueryData(["memoryCard"], data)
      queryClient.invalidateQueries(["memoryCard"], {exact: true})
    }
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    createMemoryCardMutate.mutate({
      name: nameRef.current.value
    })
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
              <select className="select select-bordered select-sm ">
                <option disabled selected>문제유형</option>
                <option>주관식</option>
                <option>객관식</option>
              </select>
              <select className="select select-bordered select-sm">
                <option disabled selected>난이도</option>
                <option>상</option>
                <option>중</option>
                <option>하</option>
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
                placeholder="정답"
                className="input input-sm input-bordered w-1/3"
                list="answer"
              />
              <datalist id="answer">
               <option value="1" />
                <option value="2" />
                <option value="3" />
                <option value="4" />
              </datalist>
            </div>
            <div className="mb-2">
              <label >
                <span className="label-text">질문</span>
              </label>
              <input
                id="question"
                name="question"
                type="text"
                placeholder="Type hear"
                className="input input-sm input-bordered w-full"
              />
            </div>
            <div className="mb-2"   >
              <label >
                <span className="label-text">부연 설명</span>
              </label>
              <textarea placeholder="부연설명" className="textarea textarea-bordered textarea-md w-full" ></textarea>
            </div>
            <div className="mb-2">
              <label >
                <span className="label-text">문항1</span>
              </label>
              <input
                id="num1"
                name="num1"
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
                id="rightAnswer"
                name="rightAnswer"
                type="text"
                placeholder="Type hear"
                className="input input-sm input-bordered w-full"
              />
            </div>
            <div className="mb-2">
              <button type="submit" disabled={createMemoryCardMutate.isLoading} className="btn w-1/6">
                {createMemoryCardMutate.isLoading ? "Loading..." : "Create"}
              </button>
            </div>

          </div>
        </form>
      </ModalForm>
    </div>
  );
};

export default AddMemoryCard
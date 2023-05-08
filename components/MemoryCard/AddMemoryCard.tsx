"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "@/components/Modal";
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
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} >
        <form onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg">문제 추가하기</h3>
          <div className="modal-action">
            <label >
              <span className="label-text">문제유형</span>
            </label>
            <input
                id="questionType"
                name="questionType"
                type="text"
                placeholder="Type hear"
                className="input input-bordered w-full"
            />
            <label >
              <span className="label-text">난이도</span>
            </label>
            <input
                id="level"
                name="level"
                type="text"
                placeholder="Type hear"
                className="input input-bordered w-full"
            />
            <label >
              <span className="label-text">질문</span>
            </label>
            <input
                id="question"
                name="question"
                type="text"
                placeholder="Type hear"
                className="input input-bordered w-full"
            />
            <label >
              <span className="label-text">부연 설명</span>
            </label>
            <input
                id="explanation"
                name="explanation"
                type="text"
                placeholder="Type hear"
                className="input input-bordered w-full"
            />
            <label >
              <span className="label-text">문항1</span>
            </label>
            <input
                id="num1"
                name="num1"
                type="text"
                placeholder="Type hear"
                className="input input-bordered w-full"
            />
            <label >
              <span className="label-text">문항2</span>
            </label>
            <input
                id="num2"
                name="num2"
                type="text"
                placeholder="Type hear"
                className="input input-bordered w-full"
            />
            <label >
              <span className="label-text">문항3</span>
            </label>
            <input
                id="num3"
                name="num3"
                type="text"
                placeholder="Type hear"
                className="input input-bordered w-full"
            />
            <label >
              <span className="label-text">문항4</span>
            </label>
            <input
                id="num4"
                name="num4"
                type="text"
                placeholder="Type hear"
                className="input input-bordered w-full"
            />
            <label >
              <span className="label-text">정답</span>
            </label>
            <input
                id="rightAnswer"
                name="rightAnswer"
                type="text"
                placeholder="Type hear"
                className="input input-bordered w-full"
            />
            <button type="submit" disabled={createMemoryCardMutate.isLoading} className="btn text-lg w-1/6">
              {createMemoryCardMutate.isLoading ? "Loading..." : "Create"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddMemoryCard
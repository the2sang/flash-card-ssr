"use client"

import {TMemoryCardAdd, TMiddleCategory, TMiddleCategoryAdd} from "@/types/types";
import {FiEdit, FiTrash2} from "react-icons/fi";
import Modal from "@/components/Modal";
import React, {FormEventHandler, useState} from "react";
import {useRouter} from "next/navigation";
import {
  deleteMemoryCardCall,
  editMemoryCard,
} from "@/app/api/memoryCardApi";
import {useMutation} from "@tanstack/react-query";

interface CategoryProps {
  id: string | undefined;
  memoryCard?: TMemoryCardAdd
}


const MemoryCard: React.FC<CategoryProps> = ({memoryCard}) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [categoryEdit, setCategoryEdit] = useState<string>(memoryCard?.question);



  const saveMemoryCard =
    useMutation((memoryCard: TMemoryCardAdd) => editMemoryCard({
      id: memoryCard.id,
      question: "",
      questionTyp: "",
      level: "",
      explanation: "",
      num1:"",
      num2:"",
      num3:"",
      num4:"",
      rightAnswer:"",
      rightAnswerNum: "",
      completed: "",
      learningCount: "",
  }));

  const onSaveMiddleCategory = () => {
    saveMemoryCard.mutate(memoryCard);
    //alert(middleCategory?.name)
    setOpenModalEdit(false);
    //router.refresh();
  }

  const deleteMiddleCategory
    = useMutation((id: string ) => deleteMemoryCardCall(id));

  const onDeleteMiddleCategory = (id: string) => {
    deleteMiddleCategory.mutate(id);
    setOpenModalDelete(false);
    router.refresh();
  }


  return (
    <tr key={memoryCard.id}>
      <td className="w-full" >{memoryCard?.question}</td>
      <td className="flex gap-5">
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor="pointer"
          className="text-blue-500"
          size={23}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit} >
          <form onSubmit={onSaveMiddleCategory}>
            <h3 className="font-bold text-lg">문제 수정</h3>
            <div className="modal-action">
              <label >
                <span className="label-text">문제유형</span>
              </label>
              <input
                id="questionType"
                name="questionType"
                value={memoryCard?.questionType}
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
                value={memoryCard?.level}
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
                value={memoryCard?.question}
                placeholder="Type hear"
                className="input input-bordered w-full"
              />
              <label >
                <span className="label-text">부연 설명</span>
              </label>
              <input
                id="explanation"
                name="explanation"
                value={memoryCard?.explanation}
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
                value={memoryCard?.num1}
                placeholder="Type hear"
                className="input input-bordered w-full"
              />
              <label >
                <span className="label-text">문항2</span>
              </label>
              <input
                id="num2"
                name="num2"
                value={memoryCard?.num2}
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
                value={memoryCard?.num3}
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
                value={memoryCard?.num4}
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
                value={memoryCard?.rightAnswer}
                type="text"
                placeholder="Type hear"
                className="input input-bordered w-full"
              />
              <button type="submit" className="btn">Submit</button>
            </div>
          </form>
        </Modal>
        <FiTrash2 onClick={() => setOpenModalDelete(true)} cursor="pointer" className="text-red-500" size={25} />
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete} >
          <h3 className="text-lg">문제를 삭제 할까요?</h3>
          <div className="modal-action">
            <button className="btn" onClick={() => onDeleteMiddleCategory(memoryCard.id)}>
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default MemoryCard
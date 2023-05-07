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
      <td className="w-full">{memoryCard?.questionType}</td>
      <td className="flex gap-5">
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor="pointer"
          className="text-blue-500"
          size={23}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit} >
          <form onSubmit={onSaveMiddleCategory}>
            <h3 className="font-bold text-lg">Edit task</h3>
            <div className="modal-action">
              <input
                value={categoryEdit}
                onChange={(e) => setCategoryEdit(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <button type="submit" className="btn">Submit</button>
            </div>
          </form>
        </Modal>
        <FiTrash2 onClick={() => setOpenModalDelete(true)} cursor="pointer" className="text-red-500" size={25} />
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete} >
          <h3 className="text-lg">선택한 대분류 코드를 삭제 할까요?</h3>
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
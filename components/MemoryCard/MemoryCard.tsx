"use client"

import {TMemoryCardAdd, TMiddleCategory, TMiddleCategoryAdd} from "@/types/types"
import {FiEdit, FiTrash2} from "react-icons/fi"
import ModalForm from "@/components/ModalForm"
import Modal from "@/components/Modal"
import React, {FormEventHandler, useRef, useState} from "react"
import {useRouter} from "next/navigation"
import {
  deleteMemoryCardCall,
  editMemoryCard,
} from "@/app/api/memoryCardApi"
import {useMutation} from "@tanstack/react-query"

interface CategoryProps {
  id: string | undefined;
  memoryCard?: TMemoryCardAdd
}


const MemoryCard: React.FC<CategoryProps> = ({memoryCard}) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [categoryEdit, setCategoryEdit] = useState<string>(memoryCard?.question);

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

    <tr key={memoryCard?.id} >
      <td className="w-full" >{memoryCard?.question}</td>
      <td className="flex gap-3">
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor="pointer"
          className="text-blue-500"
          size={21}
        />
        <ModalForm modalOpen={openModalEdit} setModalOpen={setOpenModalEdit} >
          <div className="">
            <form onSubmit={onSaveMiddleCategory} className="w-full">
              <h3 className="font-bold text-lg ml-20">문제 수정하기</h3>
              <div className="modal-new-box border-2 p-5" >
                <div className="flex-col space-x-3 mb-2">
                  <select ref={questionTeypRef} value={memoryCard?.questionType} className="select select-bordered select-sm ">
                    <option disabled selected >문제유형</option>
                    {memoryCard?.questionType === "1" ?
                      <option ref={questionTeypRef} value={memoryCard?.questionType} >주관식</option> : ""}
                    {memoryCard?.questionType === "2" ?
                      <option value={memoryCard?.questionType}>객관식</option> : "" }
                    <option>--------</option>
                    <option ref={questionTeypRef} value={memoryCard?.questionType} >주관식</option>
                    <option ref={questionTeypRef} value={memoryCard?.questionType} >객관식</option>
                  </select>
                  <select ref={levelRef} value={memoryCard?.level} className="select select-bordered select-sm">
                    <option  disabled selected>난이도</option>
                    {memoryCard?.level === 1 ? <option ref={levelRef} value={memoryCard?.level}>상</option> : ""}
                    {memoryCard?.level === 2 ? <option ref={levelRef} value={memoryCard?.level}>중</option> : ""}
                    {memoryCard?.level === 3 ? <option ref={levelRef} value={memoryCard?.level}>하</option> : ""}
                    <option>--------</option>
                    <option ref={levelRef} value={memoryCard?.level}>상</option>
                   <option ref={levelRef} value={memoryCard?.level}>중</option>
                    <option ref={levelRef} value={memoryCard?.level}>하</option>
                  </select>
                  {/*<label >*/}
                  {/*  <span className="label-text">정답</span>*/}
                  {/*</label>*/}
                  <label htmlFor="rightAnswerNum" >
                    <span className="label-text">정답</span>
                  </label>
                  <input
                    id="rightAnswerNum"
                    name="rightAnswerNum"
                    type="text"
                    ref={rightAnswerNumRef}
                    value={memoryCard?.rightAnswerNum}
                    placeholder="정답"
                    className="input input-sm input-bordered w-1/3"
                    list="answer"
                  />
                  <datalist id="answer">
                    {/*{memoryCard?.rightAnswerNum === 1 ? <option selected ref={rightAnswerNumRef} value="1" />: ""}*/}
                    {/*{memoryCard?.rightAnswerNum === 2 ? <option selected ref={rightAnswerNumRef} value="2" />: ""}*/}
                    {/*{memoryCard?.rightAnswerNum === 3 ? <option selected ref={rightAnswerNumRef} value="3" />: ""}*/}
                    {/*{memoryCard?.rightAnswerNum === 4 ? <option selected ref={rightAnswerNumRef} value="4" />: ""}*/}
                    <option ref={rightAnswerNumRef} value="1" />
                    <option ref={rightAnswerNumRef} value="2" />
                    <option ref={rightAnswerNumRef} value="3" />
                    <option ref={rightAnswerNumRef} value="4" />
                  </datalist>
                </div>
                <div className="mb-3">
                  <label className="mr-10">
                    <span className="label-text">질문</span>
                  </label>
                  <input
                    id="question"
                    name="question"
                    type="text"
                    value={memoryCard?.question}
                    placeholder="Type hear"
                    className="input input-sm input-bordered w-10/12"
                  />
                </div>
                <div className="mb-3"   >
                  {/*<label >*/}
                  {/*  <span className="label-text">부연 설명</span>*/}
                  {/*</label>*/}
                  <label htmlFor="explanation">
                    <span className="label-text mr-4">추가 설명</span>
                  </label>
                  <textarea placeholder="부연설명" ref={explationRef} id="explanation" name="explanation" value={memoryCard?.explanation} className="textarea textarea-bordered textarea-md w-10/12" ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="num1" >
                    <span className="label-text mr-10">문항1</span>
                  </label>
                  <input
                    id="num1"
                    ref={num1Ref}
                    name="num1"
                    type="text"
                    value={memoryCard?.num1}
                    placeholder="Type hear"
                    className="input input-sm input-bordered w-10/12"
                  />
                </div>
                <div className="mb-3">
                  <label >
                    <span className="label-text mr-10">문항2</span>
                  </label>
                  <input
                    id="num2"
                    name="num2"
                    value={memoryCard?.num2}
                    type="text"
                    placeholder="Type hear"
                    className="input input-sm  input-bordered w-10/12"
                  />
                </div>
                <div className="mb-3">
                  <label >
                    <span className="label-text mr-10">문항3</span>
                  </label>
                  <input
                    id="num3"
                    name="num3"
                    value={memoryCard?.num3}
                    type="text"
                    placeholder="Type hear"
                    className="input input-sm input-bordered w-10/12"
                  />
                </div>
                <div className="mb-3">
                  <label >
                    <span className="label-text mr-10">문항4</span>
                  </label>
                  <input
                    id="num4"
                    name="num4"
                    type="text"
                    value={memoryCard?.num4}
                    placeholder="Type hear"
                    className="input input-sm input-bordered w-10/12"
                  />
                </div>
                <div className="mb-3">
                  <button type="submit" disabled={saveMemoryCard.isLoading} className="btn w-1/6">
                    {saveMemoryCard.isLoading ? "Loading..." : "Create"}
                  </button>
                </div>

              </div>
            </form>
          </div>
        </ModalForm>
        <FiTrash2 onClick={() => setOpenModalDelete(true)} cursor="pointer" className="text-red-500" size={21} />
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
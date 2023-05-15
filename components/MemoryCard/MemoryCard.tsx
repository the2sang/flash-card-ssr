"use client"

import {
    levelOption,
    questionTypeOption, rightAnswerOption,
    SelectOption,
    TMemoryCardAdd,
    TMiddleCategory,
    TMiddleCategoryAdd
} from "@/types/types"
import {FiEdit, FiTrash2} from "react-icons/fi"
import ModalForm from "@/components/ModalForm"
import Modal from "@/components/Modal"
import React, {FormEventHandler, useCallback, useRef, useState} from "react"
import {useRouter} from "next/navigation"
import {
    deleteMemoryCardCall,
    editMemoryCard,
} from "@/app/api/memoryCardApi"
import {useMutation, useQuery} from "@tanstack/react-query"
import {getAllMainCategory, getMainCategorySelect} from "@/app/api/mainCategoryApi";
import {getMiddleCategorySelect} from "@/app/api/middleCategoryApi";

interface CategoryProps {
    id: string | undefined;
    memoryCard?: TMemoryCardAdd
}


const MemoryCard: React.FC<CategoryProps> = ({memoryCard}) => {
    const router = useRouter();
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);

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
    const middleCategoryIdRef = useRef<HTMLSelectElement>()
    const completionRef = useRef<HTMLInputElement>()

    const [mainCategorySelect, setMainCategorySelect] = useState<SelectOption[]>([]);

    const [newCard, setNewCard] = useState<TMemoryCardAdd>()
    const cardFormRef = useRef<HTMLFormElement>()

    const [inputVal, setInputVal] = useState('');

    const [num1, setNum1] = useState<string>("");

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>)  => {
        //console.log(e.currentTarget.value)
        setInputVal(e.currentTarget.value)
    }, [])

    const onSelectChange = useCallback((e:React.ChangeEvent<HTMLSelectElement>) => {
        setInputVal(e.currentTarget.value)
    }, [])

    const saveMemoryCard =
        useMutation((memoryCard: TMemoryCardAdd) => editMemoryCard({
            id: memoryCard.id,
            question: questionRef.current?.value,
            questionType: questionTeypRef.current?.value,
            level: levelRef.current?.value,
            explanation: explationRef.current?.value,
            num1: num1Ref.current?.value,
            num2: num2Ref.current?.value,
            num3: num3Ref.current?.value,
            num4: num4Ref.current?.value,
            rightAnswer: rightAnswerRef.current?.value,
            rightAnswerNum: rightAnswerNumRef.current?.value,
            middleCategoryId: middleCategoryIdRef.current?.value
        }));

    const onSaveMiddleCategory = () => {
        console.log(memoryCard)
        saveMemoryCard.mutate(memoryCard);
        //alert(middleCategory?.name)
        setOpenModalEdit(false);
        router.refresh();
    }

    const deleteMiddleCategory
        = useMutation((id: string) => deleteMemoryCardCall(id));

    const onDeleteMiddleCategory = (id: string) => {
        deleteMiddleCategory.mutate(id);
        setOpenModalDelete(false);
        router.refresh();
    }

    //중분류 코드 가져오기
    const middleCategorySelectQuery = useQuery({
        queryKey: ['middleCategorySelect'],
        queryFn: () => getMiddleCategorySelect()
    });

    if (middleCategorySelectQuery.status === "loading") return <h1>Loading...</h1>
    if (middleCategorySelectQuery.status === "error") {
        return <h1>{JSON.stringify(middleCategorySelectQuery.error)}</h1>
    }


    return (
      <React.Fragment key={memoryCard?.id}>
        <tr key={memoryCard?.id}>
            <td className="w-full">{memoryCard?.question}</td>
            <td className="flex gap-3">
                <FiEdit
                    onClick={() => setOpenModalEdit(true)}
                    cursor="pointer"
                    className="text-blue-500"
                    size={21}
                />
                <ModalForm modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                    <div className="">
                        <form onSubmit={onSaveMiddleCategory} className="w-full">

                            <div className="modal-new-box border-2 p-5">
                                <div className="flex mb-3 self-start">
                                    <h4 className="font-bold text-lg ml-1">문제 수정하기</h4>
                                </div>
                                <div className="flex-col space-x-3 mb-2">
                                    <select ref={questionTeypRef} defaultValue={memoryCard?.questionType}
                                            className="select select-bordered select-sm " onChange={onSelectChange}>
                                        <option disabled selected>문제유형</option>
                                        {questionTypeOption.map((option) => (
                                          <option ref={questionTeypRef} key={option.value} value={option.value} >{option.label}</option>
                                        ))}
                                    </select>
                                    <select ref={levelRef} defaultValue={memoryCard?.level} onChange={onSelectChange}
                                            className="select select-bordered select-sm">
                                        <option disabled selected>난이도</option>
                                        {levelOption.map((option) => (
                                          <option ref={levelRef} key={option.value} value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                    {/*<label >*/}
                                    {/*  <span className="label-text">정답</span>*/}
                                    {/*</label>*/}
                                    <select ref={rightAnswerNumRef} defaultValue={memoryCard?.rightAnswerNum} onChange={onSelectChange}
                                            className="select select-bordered select-sm">
                                        <option disabled selected>정답</option>
                                        {rightAnswerOption.map((option) => (
                                          <option ref={rightAnswerNumRef} key={option.value} value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="mr-10" htmlFor="middleCat">
                                        <span className="label-text">중분류</span>
                                    </label>
                                    <select ref={middleCategoryIdRef} defaultValue={memoryCard?.middleCategoryId} id="middleCat" onChange={onSelectChange}
                                            className="select select-bordered select-sm">
                                        <option disabled selected>중분류</option>
                                        {middleCategorySelectQuery.data?.list.map((option) => (
                                          <option ref={middleCategoryIdRef} value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="mr-10" htmlFor="question" >
                                        <span className="label-text">질문</span>
                                    </label>
                                    <input
                                        id="question"
                                        name="question"
                                        // onChange={onChange}
                                        defaultValue={memoryCard?.question}
                                        type="text"
                                        ref={questionRef}
                                        className="input input-sm input-bordered w-10/12"
                                    />
                                </div>
                                <div className="mb-3">
                                    {/*<label >*/}
                                    {/*  <span className="label-text">부연 설명</span>*/}
                                    {/*</label>*/}
                                    <label htmlFor="explanation">
                                        <span className="label-text mr-4">추가 설명</span>
                                    </label>
                                    <textarea placeholder="부연설명" onChange={onChange} ref={explationRef} id="explanation" name="explanation"
                                              defaultValue={memoryCard?.explanation}
                                              className="textarea textarea-bordered textarea-md w-10/12"></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="num1">
                                        <span className="label-text mr-10">문항1</span>
                                    </label>
                                    <input
                                        id="num1"
                                        onChange={onChange }
                                        ref={num1Ref}
                                        name="num1"
                                        type="text"
                                        defaultValue={memoryCard?.num1}
                                        className="input input-sm input-bordered w-10/12"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>
                                        <span className="label-text mr-10">문항2</span>
                                    </label>
                                    <input
                                        id="num2"
                                        name="num2"
                                        ref={num2Ref}
                                        onChange={onChange}
                                        defaultValue={memoryCard?.num2}
                                        type="text"
                                        className="input input-sm  input-bordered w-10/12"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>
                                        <span className="label-text mr-10">문항3</span>
                                    </label>
                                    <input
                                        id="num3"
                                        name="num3"
                                        ref={num3Ref}
                                        onChange={onChange}
                                        defaultValue={memoryCard?.num3}
                                        type="text"
                                        className="input input-sm input-bordered w-10/12"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>
                                        <span className="label-text mr-10">문항4</span>
                                    </label>
                                    <input
                                        id="num4"
                                        name="num4"
                                        ref={num4Ref}
                                        onChange={onChange}
                                        type="text"
                                        defaultValue={memoryCard?.num4}
                                        className="input input-sm input-bordered w-10/12"
                                    />
                                </div>
                                <div className="mb-3">
                                    <button type="submit" disabled={saveMemoryCard.isLoading} className="btn w-1/6">
                                        {saveMemoryCard.isLoading ? "Loading..." : "Update"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </ModalForm>
                <FiTrash2 onClick={() => setOpenModalDelete(true)} cursor="pointer" className="text-red-500" size={21}/>
                <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
                    <h3 className="text-lg">문제를 삭제 할까요?</h3>
                    <div className="modal-action">
                        <button className="btn" onClick={() => onDeleteMiddleCategory(memoryCard.id)}>
                            Yes
                        </button>
                    </div>
                </Modal>
            </td>
        </tr>
      </React.Fragment>
    );
};

export default MemoryCard
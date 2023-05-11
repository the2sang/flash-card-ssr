"use client"

import {TMiddleCategory, TMiddleCategoryAdd} from "@/types/types";
import {FiEdit, FiTrash2} from "react-icons/fi";
import Modal from "@/components/Modal";
import React, {FormEventHandler, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {
  deleteMiddleCategoryCall,
  editMiddleCategory,
} from "@/app/api/middleCategoryApi";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getAllMainCategory} from "@/app/api/mainCategoryApi";

interface CategoryProps {
  id: string | undefined;
  middleCategory?: TMiddleCategoryAdd
}


const MiddleCategory: React.FC<CategoryProps> = ({middleCategory}) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [categoryEdit, setCategoryEdit] = useState<string>(middleCategory?.name);
  const [middleCategoryId, setMiddleCategoryId] = useState<number>(middleCategory?.mainCategoryId)

  const [newSelected, setNewSelected] = useState<string>("");
  const queryClient = useQueryClient()
  const selectedRef = useRef<HTMLSelectElement>()



  const saveMiddleCategory =
    useMutation((middleCategory: TMiddleCategoryAdd) => editMiddleCategory({
      id: middleCategory.id,
      name: categoryEdit,
      mainCategoryDto: {
        id: selectedRef.current?.value,
        //name: middleCategory.mainCategoryDto.name
      }
  }));

  const onSaveMiddleCategory = () => {
    saveMiddleCategory.mutate(middleCategory);
    //alert(middleCategory?.name)
    setOpenModalEdit(false);
    //router.refresh();
  }

  const deleteMiddleCategory
    = useMutation((id: string ) => deleteMiddleCategoryCall(id));

  const onDeleteMiddleCategory = (id: string) => {
    deleteMiddleCategory.mutate(id);
    setOpenModalDelete(false);
    router.refresh();
  }

  //대분류 코드 전체 가져오기
  //대분류 코드 가져오기
  const mainCategoryQuery = useQuery({
    queryKey: ['mainCategoryData'],
    queryFn: () => getAllMainCategory()
  });


  if (mainCategoryQuery.status === "loading") return <h1>Loading...</h1>
  if (mainCategoryQuery.status === "error") {
    return <h1>{JSON.stringify(mainCategoryQuery.error)}</h1>
  }

  const selectHandle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //alert(e.target.value)
    e.preventDefault()
    const value = e.target.value
    //console.log(value)
    setNewSelected(value);
  }


  return (
    <tr key={middleCategory.id}>
      <td className="w-full" >{middleCategory.name}</td>
      <td className="w-full">{middleCategory?.mainCategoryDto.name}</td>
      <td className="flex gap-5">
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor="pointer"
          className="text-blue-500"
          size={23}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit} >
          <form onSubmit={onSaveMiddleCategory}>
            <input type="hidden" name="mainCategoryId" value={middleCategory?.mainCategoryId}/>
            <h3 className="font-bold text-lg">Edit task</h3>
            <div className="modal-action">
              <input
                value={categoryEdit}
                onChange={(e) => setCategoryEdit(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              {/*대분류*/}
              <select className="select select-bordered" ref={selectedRef} onChange={() => selectHandle}>
                {mainCategoryQuery.data?.list.map(data => (
                    <option key={data.id} ref={selectedRef} value={data.id} id={data.id} selected>{data.id}-{data.name}</option>
                ))}
              </select>
              <button type="submit" className="btn">Submit</button>
            </div>
          </form>
        </Modal>
        <FiTrash2 onClick={() => setOpenModalDelete(true)} cursor="pointer" className="text-red-500" size={25} />
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete} >
          <h3 className="text-lg">선택한 대분류 코드를 삭제 할까요?</h3>
          <div className="modal-action">
            <button className="btn" onClick={() => onDeleteMiddleCategory(middleCategory.id)}>
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default MiddleCategory
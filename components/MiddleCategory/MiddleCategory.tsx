"use client"

import {TMiddleCategory, TMiddleCategoryAdd} from "@/types/types";
import {FiEdit, FiTrash2} from "react-icons/fi";
import Modal from "@/components/Modal";
import React, {FormEventHandler, useState} from "react";
import {useRouter} from "next/navigation";
import {
  deleteMiddleCategoryCall,
  editMiddleCategory,
} from "@/app/api/middleCategoryApi";
import {useMutation} from "@tanstack/react-query";

interface CategoryProps {
  id: string | undefined;
  middleCategory?: TMiddleCategoryAdd
}


const MiddleCategory: React.FC<CategoryProps> = ({middleCategory}) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [categoryEdit, setCategoryEdit] = useState<string>(middleCategory?.name);



  const saveMiddleCategory =
    useMutation((mainCategory: TMiddleCategoryAdd) => editMiddleCategory({
      id: mainCategory.id,
      name: categoryEdit,
      mainCategoryId:
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
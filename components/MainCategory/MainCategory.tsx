"use client"

import {TMainCategory} from "@/types/types";
import {FiEdit, FiTrash2} from "react-icons/fi";
import Modal from "@/components/Modal";
import React, {FormEventHandler, useState} from "react";
import {useRouter} from "next/navigation";
import {deleteMainCategory, editMainCategory} from "@/app/api/mainCategoryApi";

interface CategoryProps {
  mainCategory: TMainCategory
}

const MainCategory: React.FC<CategoryProps> = ({mainCategory}) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [categoryToEdit, setCategoryEdit] = useState<string>(mainCategory.name);

  const handleSubmitEditCategory: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editMainCategory({
      id: mainCategory.id,
      name: mainCategory.name
    });
    setOpenModalEdit(false);
    router.refresh();
  }

  const handleDeleteCategory = async (id: string | undefined) => {
    await deleteMainCategory(id);
    setOpenModalDelete(false);
    router.refresh();
  }

  return (
    <tr key={mainCategory.id}>
      <td className="w-full" >{mainCategory.name}</td>
      <td className="flex gap-3">
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor="pointer"
          className="text-blue-500"
          size={20}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit} >
          <form onSubmit={handleSubmitEditCategory}>
            <h3 className="font-bold text-lg">Edit task</h3>
            <div className="modal-action">
              <input
                value={categoryToEdit}
                onClick={(e) => setCategoryEdit("")}
                onChange={(e) => setCategoryEdit(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <button type="submit"  className="btn">Submit</button>
            </div>
          </form>
        </Modal>
        <FiTrash2 onClick={() => setOpenModalDelete(true)} cursor="pointer" className="text-red-500" size={20} />
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete} >
          <h3 className="text-lg">선택한 대분류 코드를 삭제 할까요?</h3>
          <div className="modal-action">
            <button className="btn" onClick={() => handleDeleteCategory(mainCategory.id)}>
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default MainCategory
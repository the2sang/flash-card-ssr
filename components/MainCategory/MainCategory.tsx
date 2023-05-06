"use client"

import {TMainCategory} from "@/types/types";
import {FiEdit, FiTrash2} from "react-icons/fi";
import Modal from "@/components/Modal";
import React, {FormEventHandler, useState} from "react";
import {useRouter} from "next/navigation";
import {deleteMainCategory, editMainCategory, getAllMainCategory} from "@/app/api/mainCategoryApi";
import {useMutation} from "@tanstack/react-query";

interface CategoryProps {
  id: string | undefined;
  mainCategory: TMainCategory
}

// interface CategoryTypes {
//   id: number;
//   mainCategory: TMainCategory;
// }

const MainCategory: React.FC<CategoryProps> = ({mainCategory}) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [categoryEdit, setCategoryEdit] = useState<string>(mainCategory.name);

  // const handleSubmitEditCategory: FormEventHandler<HTMLFormElement> = async (e) => {
  //   e.preventDefault();
  //   const updateData = await editMainCategory({
  //     id: mainCategory.id,
  //     name: categoryEdit
  //   });
  //   setOpenModalEdit(false);
  //   console.log(updateData.name);
  //   //setCategoryEdit(updateData.name);
  //   router.refresh();
  //
  // }

  const saveMainCategory =
    useMutation((mainCategory: TMainCategory) => editMainCategory({
      id: mainCategory.id,
      name: categoryEdit
  }));

  const onSaveMainCategory = () => {
    saveMainCategory.mutate(mainCategory);
    setOpenModalEdit(false);
    //router.refresh();
  }

  const deleteMainCat
    = useMutation((id: string ) => deleteMainCategory(id));

  const onDeleteCategory = (id: string) => {
    deleteMainCat.mutate(id);
    setOpenModalDelete(false);
    router.refresh();
  }

  // const updateCat = async (newCat: TMainCategory): Promise<TMainCategory> => {
  //   console.log(newCat);
  //   const {data} = await editMainCategory(newCat);
  //   setOpenModalEdit(false);
  //   router.refresh();
  //   return data;
  // }


  // const { mutate, isLoading, isError, error, isSuccess }
  //   = useMutation(updateCat);

  // const handleDeleteCategory = async (id: string | undefined) => {
  //   //console.log(id);
  //   await deleteMainCategory(id);
  //   setOpenModalDelete(false);
  //   router.refresh();
  // }

  return (
    <tr key={mainCategory.id}>
      <td className="w-full" >{mainCategory.name}</td>
      <td className="flex gap-5">
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor="pointer"
          className="text-blue-500"
          size={23}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit} >
          <form onSubmit={onSaveMainCategory}>
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
            <button className="btn" onClick={() => onDeleteCategory(mainCategory.id)}>
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default MainCategory
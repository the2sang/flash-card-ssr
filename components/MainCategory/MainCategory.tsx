"use client"

import {TMainCategory} from "@/types/types";
import {FiEdit, FiTrash2} from "react-icons/fi";
import Modal from "@/components/Modal";
import React, {FormEventHandler, useCallback, useState} from "react";
import {useRouter} from "next/navigation";
import {deleteMainCategory, editMainCategory, getAllMainCategory} from "@/app/api/mainCategoryApi";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

interface CategoryProps {
  id: string | undefined;
  mainCategory: TMainCategory
}

const MainCategory: React.FC<CategoryProps> = ({mainCategory}) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
  const [categoryEdit, setCategoryEdit] = useState<string>(mainCategory.name)
  const queryClient = useQueryClient()
  const [reload, setReload] = useState<Date>(new Date)

  const reloadData2 = useCallback(() => {

     // alert('저장되었습니다.')
    useQuery({
      queryKey: ['mainCategorys'],
      queryFn: () => getAllMainCategory(),
      keepPreviousData: true,
      // cacheTime: 1000,
      // staleTime: 1000,
    })
  }, [reload]);

  const saveMainCategory =
    useMutation((mainCategory: TMainCategory) => editMainCategory({
      id: mainCategory.id,
      name: categoryEdit
    }));


  const onSaveMainCategory = () => {
    saveMainCategory.mutate(mainCategory)
    setOpenModalEdit(false)
    setReload(new Date())
    reloadData2()

    router.push('/MainCategory')
  }

  const showToastMessage = () => {
    toast.success('Success Notification !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };

  const deleteMainCat
    = useMutation((id: string | number ) => deleteMainCategory(id));

  const onDeleteCategory = (id: string | number ) => {
    deleteMainCat.mutate(id)
    showToastMessage()
    setOpenModalDelete(false)
    setReload(new Date())
    // reloadData2()
    router.refresh()
  }

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
        <ToastContainer />
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
            <button className="btn" onClick={() => onDeleteCategory(mainCategory.id as number )}>
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>

  )
}

export default MainCategory
"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "@/components/Modal";
import React, {FormEventHandler, useState} from "react";
import {addMainCategory, editMainCategory} from "@/app/api/mainCategoryApi";
import { useRouter} from "next/navigation";
import {useMutation} from "@tanstack/react-query";
import {TMainCategory} from "@/types/types";
// import {v4 as uuidv4} from "uuid";

interface CategoryProps {
  id: string | undefined;
  mainCategory: TMainCategory
}

const AddMainCategory = () => {
  const router  = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newMainCategoryValue, setNewMainCategoryValue] = useState<string>("");

  const handleSubmitNewMainCategory: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addMainCategory({
      name: newMainCategoryValue
    })
    setNewMainCategoryValue("");
    setModalOpen(false);
    router.refresh();
  }

  const saveMainCategory =
    useMutation((mainCategory: TMainCategory) => addMainCategory({
      name: newMainCategoryValue
    }));

  const onSaveMainCategory = async () => {
    await saveMainCategory.mutate(newMainCategoryValue);
    console.log(newMainCategoryValue);
    setNewMainCategoryValue("");
    setModalOpen(false);
    //router.refresh();
  }






  return (
    <div className="justify-center ml-10 mr-10 mt-5 mb-5">
      <button
        onClick={() => setModalOpen(true) }
        className='btn btn-primary w-full pl-24 pr-24 mb-2.5'
      >
        대분류 코드 추가하기<AiOutlinePlus size={18} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} >
        <form onSubmit={onSaveMainCategory}>
          <h3 className="font-bold text-lg">대분류코드 추가하기</h3>
          <div className="modal-action">
            <input
              value={newMainCategoryValue}
              onChange={(e) => setNewMainCategoryValue(e.target.value)}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
            <button type="submit"  className="btn">Submit</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddMainCategory
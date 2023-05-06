"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "@/components/Modal";
import {FormEventHandler, useState} from "react";
import {addMainCategory} from "@/app/api/mainCategoryApi";
import { useRouter} from "next/navigation";
// import {v4 as uuidv4} from "uuid";

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


  return (
    <div className="flex justify-center ">
      <button
        onClick={() => setModalOpen(true) }
        className='btn btn-primary w-full'
      >
        대분류 코드 추가하기 <AiOutlinePlus size={18} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} >
        <form onSubmit={handleSubmitNewMainCategory}>
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
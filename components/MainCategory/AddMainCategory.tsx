"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "@/components/Modal";
import React, {FormEventHandler, useCallback, useRef, useState} from "react";
import {addMainCategory, editMainCategory, getAllMainCategory} from "@/app/api/mainCategoryApi";
import { useRouter} from "next/navigation";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {TMainCategory} from "@/types/types";
import {revalidatePath} from "next/cache";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CategoryProps {
  id: string | undefined;
  mainCategory: TMainCategory;
}

const AddMainCategory = () => {

  const nameRef = useRef<HTMLInputElement>();
  const queryClient = useQueryClient();
  const router  = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newMainCategoryValue, setNewMainCategoryValue] = useState<string>("");
  const [reload, setReload] = useState<Date>(new Date())


  const reloadData = useCallback(() => {
    showToastMessage()
    console.log('reload')
    const { status, data, error, isFetching, isPreviousData} = useQuery({
      queryKey: ['mainCategorys'],
      queryFn: () => getAllMainCategory(),
      // keepPreviousData: false,
      // cacheTime: 1000,
      // staleTime: 1000,
    });

    if (status === "loading") return <h1>Loading...</h1>
    if (status === "error") {
      return <h1>{JSON.stringify(error)}</h1>
    }
    }, [reload]);


  const createCategoryMutate = useMutation({
    mutationFn: addMainCategory,
    onSuccess: data => {
      queryClient.setQueryData(["mainCategory"], data);
      queryClient.invalidateQueries(["mainCategory"])
      setReload(new Date)
      reloadData()
    }
  });

  const showToastMessage = () => {
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createCategoryMutate.mutate({
      name: nameRef?.current?.value!
    });
    setNewMainCategoryValue("");
    setModalOpen(false);
    // router.refresh()
  }

  return (
    <div className="justify-center ml-10 mr-10 mt-5 mb-5">
      <ToastContainer />
      <button
        onClick={() => setModalOpen(true) }
        className="btn btn-primary w-full pl-24 pr-24 mb-2.5"
      >
        대분류 코드 추가하기<AiOutlinePlus size={18} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} >
        <form onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg">대분류코드 추가하기</h3>
          <div className="modal-action">
            <input
              // value={newMainCategoryValue}
              onChange={(e) => setNewMainCategoryValue(e.target.value)}
              type="text"
              placeholder="Type here"
              ref={nameRef}
              className="input input-bordered w-full"
            />
            <button type="submit" disabled={createCategoryMutate.isLoading} className="btn text-lg w-1/6">
              {createCategoryMutate.isLoading ? "Loading..." : "Create"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddMainCategory;
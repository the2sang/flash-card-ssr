"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "@/components/Modal";
import React, {FormEventHandler, useRef, useState} from "react";
import {
  addMiddleCategory2,
} from "@/app/api/middleCategoryApi";
import { useRouter} from "next/navigation";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {TMainCategory, TMiddleCategory, TMiddleCategoryAdd} from "@/types/types";
import {QueryClient} from "@tanstack/query-core";
import {getAllMainCategory} from "@/app/api/mainCategoryApi";

interface CategoryProps {
  id: string | undefined;
  middleCategory: TMiddleCategory;
  mainCategory: TMainCategory;
}


const AddMiddleCategory = () => {

  const nameRef = useRef<HTMLInputElement>()
  const mainCategoryRef = useRef<HTMLInputElement>()
  const selectedRef = useRef<HTMLSelectElement>()
  const queryClient = useQueryClient()
  const router  = useRouter();
  const [newSelected, setNewSelected] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newMiddleCategoryValue, setNewMiddleCategoryValue] = useState<string>("");
  const [newMainCategoryValue, setMainCategoryValue] = useState<string>("");

  // type SelectOptionType = { label: string, value: string }
  //
  // const [myState, setMyState] = useState({})
  //
  // const handleSelectionChange = (option: SelectOptionType | null) => {
  //   console.log(option)
  //   if (option) {
  //     setMyState(option)
  //   }
  // };
  //


  const createCategoryMutate = useMutation({
    mutationFn: addMiddleCategory2,
    onSuccess: data => {
      queryClient.setQueryData(["middleCategory"], data)
      queryClient.invalidateQueries(["middleCategory"], {exact: true})
    }
  })



  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    createCategoryMutate.mutate({
      name: nameRef.current?.value,
      mainCategoryId: selectedRef.current?.value
    })
    setNewMiddleCategoryValue("")
    setModalOpen(false)
    router.refresh()
  }

  //중분류 코드 가져오기


  const mainCategoryQuery = useQuery({
    queryKey: ['mainCategoryData'],
    queryFn: () => getAllMainCategory()
  });


  if (mainCategoryQuery.status === "loading") return <h1>Loading...</h1>
  if (mainCategoryQuery.status === "error") {
    return <h1>{JSON.stringify(mainCategoryQuery.error)}</h1>
  }

  const selectHandle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    alert(e.target.value)
    e.preventDefault()
    const value = e.target.value
    console.log(value)
    setNewSelected(value);
  }



  return (
    <div className="justify-center col-auto ml-10 mr-10 mt-5 mb-5 h-full" >
      <button
        onClick={() => setModalOpen(true) }
        className='btn btn-primary w-full pl-24 pr-24 mb-2.5'
      >
        중분류 코드 추가하기<AiOutlinePlus size={18} />
      </button>
      <div className="max-w-xs">
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} >
        <form onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg">중분류코드 추가하기</h3>
          <div className="modal-action">
            {/*대분류*/}
            <input
              onChange={(e) => setNewMiddleCategoryValue(e.target.value)}
              type="text"
              placeholder="Type here"
              ref={nameRef}
              className="input input-bordered w-[120px] w-full"
            />
            {/*중분류*/}
            <select className="select select-bordered" ref={selectedRef} onChange={() => selectHandle}>
              {mainCategoryQuery.data?.list.map(data => (
                <option key={data.id} ref={selectedRef} value={data.id} id={data.id} selected>{data.id}-{data.name}</option>
              ))}
            </select>
            <button type="submit" disabled={createCategoryMutate.isLoading} className="btn">
              {createCategoryMutate.isLoading ? "Loading..." : "Create"}
            </button>
          </div>
        </form>
      </Modal>
      </div>
    </div>
  );
};

export default AddMiddleCategory
import {TMiddleCategory, TMiddleCategoryAdd, TMiddleCategorys} from "@/types/types";
import middleCategory from "@/components/MiddleCategory/MiddleCategory";

const baseUrl = "http://localhost:8080/api";

export const getAllMiddleCategory = async (): Promise<TMiddleCategorys> => {
  const res = await fetch(`${baseUrl}/middleCategoryFetch/all`, {cache: 'no-store'});
  const middleCategorys = await res.json();

  //console.log(middleCategory);

  return middleCategorys;
}

export const addMiddleCategory = async (middleCategory: TMiddleCategory): Promise<TMiddleCategory> => {
  const res = await fetch(`${baseUrl}/middleCategory/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(middleCategory)
  })
  //console.log(res.json());
  const newMiddleCategory = await res.json();
  return newMiddleCategory;
}

export const addMiddleCategory2 = async (mainCategory: TMiddleCategoryAdd): Promise<TMiddleCategoryAdd> => {
  const res = await fetch(`${baseUrl}/middleCategory/new2`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mainCategory)
  })
  //console.log(res.json());
  const newMiddleCategory = await res.json();
  return newMiddleCategory;
}

export const editMiddleCategory = async (middleCategory: TMiddleCategoryAdd): Promise<TMiddleCategoryAdd> => {
  const res = await fetch(  `${baseUrl}/middleCategory/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(middleCategory)
  })
  //alert(JSON.stringify(res));
  const updatedMiddleCategory2 = await res.json();
  return updatedMiddleCategory2;
}

export const deleteMiddleCategoryCall = async (id: string): Promise<void> => {
  await fetch(`${baseUrl}/middleCategory/${id}`, {
    method: 'DELETE'
  })
}

//중분류 Select Option
export const getMiddleCategorySelect = async () => {
  const res = await fetch(`${baseUrl}/middleCategory/selectOption`)
  const mainCategorySelect = res.json();
  return mainCategorySelect;
}



export const getMiddleCategoryByMainCatId = async (id: string | number) => {
  const res = await  fetch(`${baseUrl}/middleCategory/mainCategoryCode?id=${id}`)
  const middleCategoryByMainCat = res.json()
  return middleCategoryByMainCat
}
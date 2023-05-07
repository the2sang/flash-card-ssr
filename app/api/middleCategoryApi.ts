import {TMiddleCategory, TMiddleCategoryAdd} from "@/types/types";
import middleCategory from "@/components/MiddleCategory/MiddleCategory";

const baseUrl = "http://localhost:8080/api";

export const getAllMiddleCategory = async (): Promise<TMiddleCategory> => {
  const res = await fetch(`${baseUrl}/middleCategoryFetch/all`, {cache: 'no-store'});
  const middleCategorys = await res.json();

  console.log(middleCategory);

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
  console.log(res.json());
  const newMiddleCategory = await res.json();
  return newMiddleCategory;
}

export const addMiddleCategory2 = async (mainCategoryAdd: TMiddleCategoryAdd): Promise<TMiddleCategoryAdd> => {
  const res = await fetch(`${baseUrl}/middleCategory/new2`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mainCategoryAdd)
  })
  console.log(res.json());
  const newMiddleCategory = await res.json();
  return newMiddleCategory;
}

export const editMiddleCategory = async (middleCategory: TMiddleCategory): Promise<TMiddleCategory> => {
  const res = await fetch(`${baseUrl}/middleCategory/${middleCategory.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(middleCategory)
  })
  const updatedMiddleCategory = await res.json();
  return updatedMiddleCategory;
}

export const deleteMiddleCategoryCall = async (id: string): Promise<void> => {
  await fetch(`${baseUrl}/middleCategory/${id}`, {
    method: 'DELETE'
  })
}
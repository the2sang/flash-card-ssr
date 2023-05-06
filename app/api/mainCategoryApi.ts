import {TMainCategory} from "@/types/types";

const baseUrl = "http://localhost:8080/api";

export const getAllMainCategory = async (): Promise<TMainCategory[]> => {
  const res = await fetch(`${baseUrl}/mainCategory/all`, {cache: 'no-store'});
  const mainCategorys = await res.json();
  return mainCategorys;
}

export const addMainCategory = async (maincategory: TMainCategory): Promise<TMainCategory> => {
  const res = await fetch(`${baseUrl}/mainCategory/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(maincategory)
  })
  const newMainCategory = await res.json();
  return newMainCategory;
}

export const editMainCategory = async (mainCategory: TMainCategory): Promise<TMainCategory> => {
  const res = await fetch(`${baseUrl}/mainCategory/${mainCategory.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mainCategory)
  })
  const updatedMainCategory = await res.json();
  return updatedMainCategory;
}

export const deleteMainCategory = async (id: string | undefined): Promise<void> => {
  await fetch(`${baseUrl}/mainCategory/${id}`, {
    method: 'DELETE'
  })
}
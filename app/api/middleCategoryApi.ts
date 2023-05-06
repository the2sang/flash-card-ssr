import {MiddleCategory} from "@/types/types";

const baseUrl = "http://localhost:8080/api";

export const getAllMiddleCategory = async (): Promise<MiddleCategory[]> => {
  const res = await fetch(`${baseUrl}/middleCategory/all`, {cache: 'no-store'});
  const middleCategorys = await res.json();
  return middleCategorys;
}

export const addCategory = async (middleCategory: MiddleCategory): Promise<MiddleCategory> => {
  const res = await fetch(`${baseUrl}/middleCategory/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(middleCategory)
  })
  const newMiddleCategory = await res.json();
  return newMiddleCategory;
}

export const editMiddleCategory = async (middleCategory: MiddleCategory): Promise<MiddleCategory> => {
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

export const deleteMiddleCategory = async (id: string): Promise<void> => {
  await fetch(`${baseUrl}/middleCategory/${id}`, {
    method: 'DELETE'
  })
}
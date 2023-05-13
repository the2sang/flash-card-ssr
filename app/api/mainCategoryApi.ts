import {TMainCategory, TMainCategorys} from "@/types/types";

const baseUrl = "http://localhost:8080/api";

export const getAllMainCategory = async (): Promise<TMainCategorys> => {
  const res = await fetch(`${baseUrl}/mainCategory/all`);
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
  const res = await fetch(`${baseUrl}/mainCategory/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mainCategory)
  })
  const updatedMainCategory = await res.json();
  //console.log(updatedMainCategory);
  return updatedMainCategory;
}

//대분류 Select Option
export const getMainCategorySelect = async () => {
  const res = await fetch(`${baseUrl}/mainCategory/selectOption`)
  const mainCategorySelect = res.json();
  return mainCategorySelect;
}



// 대분류 삭제
// export const deleteMainCategory = async (id: string | undefined): Promise<void> => {
//   console.log('delete:' + id);
//   await fetch(`${baseUrl}/mainCategory/${id}`, {
//     method: 'DELETE'
//   })
// }

//대분류 삭제
export const deleteMainCategory = async (id: string | undefined): Promise<void> => {
  //console.log('delete:' + id);
  await fetch(`${baseUrl}/mainCategory/${id}`, {
    method: 'POST'
  })
}
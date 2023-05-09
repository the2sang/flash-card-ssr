import axios from "axios";
import {
  TMainCategorys,
  TMemoryCard,
  TMemoryCardAdd,
  TMemoryCards,
  TMiddleCategory,
  TMiddleCategoryAdd
} from "@/types/types";

const baseUrl = "http://localhost:8080/api";

export async function fetchMemoryCards(id: number) {
  const req = await fetch(`http://localhost:8080/api/memoryCard/middlecode?param=${id}`);
  const data = await req.json();
}

export const getAllMemoryCard = async (): Promise<TMemoryCards> => {
  const res = await fetch(`${baseUrl}/memoryCard/all`);
  const memoryCards = await res.json();
  return memoryCards;
}

export const getAllMemoryCardPage = async (page: number): Promise<TMemoryCards> => {
  const res = await fetch(`${baseUrl}/memoryCard/next?page=${page}`);

  // const pageSize = 10;
  //
  const memoryCards = await res.json();
  //
  // const results = memoryCards.list.fill(0)
  //     .map((card, i) => {
  //       const id = page * pageSize + (i + 1)
  //       const name = card.question
  //       return {
  //         name: name,
  //         id,
  //       }
  //     })
  // console.log(results)

  return memoryCards;
}

export async function getMemoryCards(id: number) {
  const response = await axios.get(
    `http://localhost:8080/api/memoryCard/middlecode?param=${id}`
  );

  return response.data;
}


export const addMemoryCard = async (memoryCard: TMemoryCardAdd): Promise<TMemoryCardAdd> => {
 // console.log(memoryCard);
  const res = await fetch(`${baseUrl}/memoryCard/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(memoryCard)
  })
 // console.log(res.json());
  const newMemoryCard = await res.json();
  return newMemoryCard;
}

export const addMemoryCard2 = async (memoryCard: TMemoryCardAdd): Promise<TMemoryCardAdd> => {
  const res = await fetch(`${baseUrl}/memoryCard/new2`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(memoryCard)
  })
  console.log(res.json());
  const newMemoryCard = await res.json();
  return newMemoryCard;
}

export const editMemoryCard = async (memoryCard: TMemoryCardAdd): Promise<TMemoryCardAdd> => {
  const res = await fetch(  `${baseUrl}/memoryCard/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(memoryCard)
  })
  alert(JSON.stringify(res));
  const updatedMemoryCard2 = await res.json();
  return updatedMemoryCard2;
}

export const deleteMemoryCardCall = async (id: string): Promise<void> => {
  await fetch(`${baseUrl}/memoryCard/${id}`, {
    method: 'DELETE'
  })
}

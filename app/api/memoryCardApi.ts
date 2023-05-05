import axios from "axios";

export async function fetchMemoryCards(id: number) {
  const req = await fetch(`http://localhost:8080/api/memorycard/middlecode?param=${id}`);
  const data = await req.json();
}

export async function getMemoryCards(id: number) {
  const response = await axios.get(
    `http://localhost:8080/api/memorycard/middlecode?param=${id}`
  );

  return response.data;
}


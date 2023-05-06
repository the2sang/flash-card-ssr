export type TMainCategory = {
  id?: string
  name: string
}

export type TMainCategorys =  {
  success: string
  code: string
  msg: string
  list : TMainCategory[]
}

export type TMiddleCategory = {
  id: number
  name: string
  mainCategoryDto: {
    id: number
    name: string
  }
}


export type MemoryCard =  {
  id:number
  level: number
  question: string
  explanation: string
  num1: string
  num2: string
  num3: string
  num4: string
  rightAnswer: string
  rightAnswerNum: number
  completed: number
  learningCount: number
  middleCategoryDto: {
    id: number
    name: string
  }
}

export type MemoryCards =  {
  success: string
  code: string
  msg: string
  list : MemoryCard[]
}
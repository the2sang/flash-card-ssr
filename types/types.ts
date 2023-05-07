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
  id?: string
  name: string
  mainCategory: TMainCategory
}

export type TMiddleCategoryAdd = {
  name: string
  mainCategoryId: string
}


export type TMiddleCategorys = {
  success: string
  code: string
  msg: string
  list : TMiddleCategory[]
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
  middleCategory: {
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
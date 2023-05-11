export type TMainCategory = {
  id?: number
  name: string
}

export type TMainCategorys =  {
  success: string
  code: string
  msg: string
  list : TMainCategory[]
}

export type TMiddleCategory = {
  id?: number
  name: string
  mainCategory: TMainCategory
}


export type TMiddleCategorys = {
  success: string
  code: string
  msg: string
  list : TMiddleCategory[]
}

export type TMiddleCategoryAdd = {
  id?: number
  name: string
  mainCategoryDto: TMainCategory
}




export type TMemoryCard =  {
  id:number
  level: number
  question: string
  questionType: string
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

export type TMemoryCardAdd =  {
  id:number,
  level: number
  question: string
  questionType: string
  explanation: string
  num1: string
  num2: string
  num3: string
  num4: string
  rightAnswer: string
  rightAnswerNum: number
  completed: number
  learningCount: number
  middleCategoryId: number
}

export type TMemoryCards =  {
  success: string
  code: string
  msg: string
  list : TMemoryCard[]
}

export type TMemoryCardPages = {
  success: boolean,
  code: number,
  msg: string,
  page: {
    content:TMemoryCard[],
    totalElements: number,
    totalPages: number,
    size: number,
    numberOfElements: number,
    first: boolean,
    empty: false,
  },
}
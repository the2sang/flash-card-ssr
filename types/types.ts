export type TMainCategory = {
  id?: number | string | undefined
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
  middleCategory: TMiddleCategory
}

export type TMemoryCardAdd =  {
  id?:number,
  level: number | string
  question: string
  questionType: string
  explanation: string
  num1: string
  num2: string
  num3: string
  num4: string
  rightAnswer: string
  rightAnswerNum: number | string
  completed: number | string
  learningCount: number | string
  middleCategoryId: number
}

export type TMemoryCards =  {
  success: string
  code: string
  msg: string
  list : TMemoryCardAdd[]
}

export type TMemoryCardPages = {
  success: boolean,
  code: number,
  msg: string,
  page: {
    content:TMemoryCardAdd[],
    totalElements: number,
    totalPages: number,
    size: number,
    numberOfElements: number,
    first: boolean,
    empty: false,
  },
}

export type SelectOption = {
  label: string,
  value: number
}

export type MemoryCardSearchParam = {
  mainCategoryId?: string,
  middleCategoryId?: string,
  completed?: string,
  question?: string,
  size: number,
  page: number

}

export const levelOption = [
  {
    label: "상",
    value: 1,
  },
  {
    label: "중",
    value: 2,
  },
  {
    label: "하",
    value: 3,
  },
]

export const questionTypeOption = [

  {
    label: "주관식",
    value: 1,
  },
  {
    label: "객관식",
    value: 2,
  },
]

export const rightAnswerOption = [

  {
    label: "1번",
    value: 1,
  },
  {
    label: "2번",
    value: 2,
  },

  {
    label: "3번",
    value: 3,
  },
  {
    label: "4번",
    value: 4,
  },


]
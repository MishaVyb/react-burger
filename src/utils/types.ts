import { UUID } from 'crypto'

export type TArrangement = 'top' | 'bottom'

export enum IngredientTypes {
  bun = 'bun',
  sauce = 'sauce',
  main = 'main',
}

function isValueInStringEnum<E extends string>(strEnum: Record<string, E>) {
  const enumValues = Object.values(strEnum) as string[]
  return (value: string): value is E => enumValues.includes(value)
}

export const isIngredientType = isValueInStringEnum(IngredientTypes)

export type TBurgerIngredient = {
  _id: string
  name: string
  type: IngredientTypes
  proteins: number
  fat: number
  carbohydrates: number
  calories: number
  price: number
  image: string
  image_mobile: string
  image_large: string

  // Custom fields:
  counter?: number
  _key?: UUID
}

export type TBunIngredient = TBurgerIngredient & { type: IngredientTypes.bun }
export type TFillingIngredient = TBurgerIngredient & { type: IngredientTypes.main | IngredientTypes.sauce }

//////////////////////////////////// TEST //////////////////////////////////// XXX
export const aaa: TBunIngredient = {
  _id: '',
  name: '',
  type: IngredientTypes.bun,
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 1,
  price: 1,
  image: '',
  image_mobile: '',
  image_large: '',
}
////////////////////////////////////

export const isFilling = (item: TBurgerIngredient | null | undefined) =>
  item?.type === IngredientTypes.sauce || item?.type === IngredientTypes.main

export enum DragGroups {
  BUN = 'BUN',
  FILLINGS = 'FILLINGS', // Fillings: начинки. Includes `sauce` and `main` ingredients.
  FILLINGS_CONSTRUCTOR = 'FILLINGS_CONSTRUCTOR', // Sortable Fillings in constructor (on the right bar).
}

// Drag item from left Ingredients bar to right Constructor bar
// (the same as TBurgerIngredient with extra props applyied during dnd acting)
export interface IDragFullItem extends TBurgerIngredient {
  isBunApplied?: boolean
  index?: number
}

// Drag item sortable inside right Constructor bar (index required in that case)
export interface IDragItem {
  index: number
}

export const getDragGroup = (
  dependingOn: TBurgerIngredient | TArrangement | undefined,
  defaultGroup: DragGroups = DragGroups.FILLINGS
) => {
  if (!dependingOn) {
    return defaultGroup
  } else if (typeof dependingOn === 'string') {
    const arrangement = dependingOn
    return arrangement === 'top' || arrangement === 'bottom' ? DragGroups.BUN : DragGroups.FILLINGS
  } else {
    const item = dependingOn
    return item.type === IngredientTypes.bun ? DragGroups.BUN : DragGroups.FILLINGS
  }
}

declare global {
  interface ObjectConstructor {
    typedKeys<T>(obj: T): Array<keyof T>
  }
}
Object.typedKeys = Object.keys

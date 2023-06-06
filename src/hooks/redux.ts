import { useDispatch as untypedUseDispatch, useSelector as untypedUseSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

import { AppDispatch, RootState } from '../services/store'

export const useDispatch: () => AppDispatch = untypedUseDispatch
export const useSelector: TypedUseSelectorHook<RootState> = untypedUseSelector

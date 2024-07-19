import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { storageSlice } from "../features/storageSlice"



const rootReducer = combineSlices( storageSlice)

export type RootState = ReturnType<typeof rootReducer>


export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    
    preloadedState,
  })
  
  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()


export type AppStore = typeof store

export type AppDispatch = AppStore["dispatch"]


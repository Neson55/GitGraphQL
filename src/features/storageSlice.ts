import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

export interface StorageSliceState {
  inputValue: string
}

const initialState: StorageSliceState = {
  inputValue: "",
}

export const storageSlice = createSlice({
  name: "storage",

  initialState,

  reducers: {
    addInAddressBar: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload
    },

  },
  selectors: {
    selectName: counter => counter.inputValue,
  },
})

export const { addInAddressBar} = storageSlice.actions

export const { selectName} = storageSlice.selectors

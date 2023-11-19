import { createSlice } from '@reduxjs/toolkit'
import products from '../data/products'

const initialState = {
  products: products,
  selectedProduct: null,
}

export const productSlice = createSlice({
  name: 'products',
  initialState, // since the param in the initialState is same as product no need to do initialState: initialState
  reducers: {
    setSelectedProduct: (state, action) => {
      const productId = action.payload
      state.selectedProduct = state.products.find((p) => p.id === productId)
    },
  },
})

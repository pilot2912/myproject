import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import globalReducer from './globalSlice'
import homeReducer from './homeSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    global: globalReducer,
    home: homeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

import { combineReducers } from "redux"
import { AuthReducer } from "./auth"
import { ProductsReducer } from "./products"

const reducers = combineReducers({
  auth: AuthReducer,
  products: ProductsReducer,
})

export type RootState = ReturnType<typeof reducers>
export default reducers

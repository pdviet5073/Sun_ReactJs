import { combineReducers } from "redux";

import productReducer from "./product.reducer";
import filterReducer from "./filter.reducer";

export default combineReducers({
    productReducer,
    filterReducer,
});

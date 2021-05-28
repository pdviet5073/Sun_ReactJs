import {
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAIL,
    GET_PRODUCT_FILTER_SUCCESS,
    GET_PRODUCT_FILTER_FAIL,
} from "../constants";

const initialState = {
    productList: [],
    lengthProductFilter: 0,
};

export default function productReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCT_SUCCESS:
            return {
                ...state,
                productList: [...action.payload],
            };
        case GET_PRODUCT_FAIL: {
            return state;
        }
        case GET_PRODUCT_FILTER_SUCCESS:
            return {
                ...state,
                lengthProductFilter: action.payload,
            };
        case GET_PRODUCT_FILTER_FAIL: {
            return state;
        }

        default:
            return state;
    }
}

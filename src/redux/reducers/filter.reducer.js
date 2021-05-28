import {
    SET_CATEGORIES,
    SET_SORT_PRICE,
    SET_SEARCH_KEY,
    SET_BRAND,
    SET_TYPE,
    SET_RANGE_PRICE,
    SET_CURRENT_PAGE,
    SET_RATE,
} from "../constants";
const initialState = {
    categories: {},
    rate: 0,
    type: [],
    brand: [],
    rangePrice: [],
    searchKey: "",
    sortPrice: "",
    currentPage: 1,
};

export default function filterReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CATEGORIES:
            return {
                ...state,
                categories: { ...action.payload },
            };
        case SET_SORT_PRICE: {
            return {
                ...state,
                sortPrice: action.payload,
            };
        }
        case SET_SEARCH_KEY:
            return {
                ...state,
                searchKey: action.payload,
            };
        case SET_BRAND: {
            return {
                ...state,
                brand: [...action.payload],
            };
        }
        case SET_TYPE:
            return {
                ...state,
                type: [...action.payload],
            };
        case SET_RANGE_PRICE: {
            return {
                ...state,
                rangePrice: [...action.payload],
            };
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.payload,
            };
        }
        case SET_RATE: {
            return {
                ...state,
                rate: action.payload,
            };
        }
        default:
            return state;
    }
}

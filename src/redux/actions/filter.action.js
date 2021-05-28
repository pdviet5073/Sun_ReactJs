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

export function setCategories(params) {
    return {
        type: SET_CATEGORIES,
        payload: params,
    };
}
export function setSortPrice(params) {
    return {
        type: SET_SORT_PRICE,
        payload: params,
    };
}
export function setSearchKey(params) {
    return {
        type: SET_SEARCH_KEY,
        payload: params,
    };
}
export function setBrand(params) {
    return {
        type: SET_BRAND,
        payload: params,
    };
}

export function setType(params) {
    return {
        type: SET_TYPE,
        payload: params,
    };
}

export function setRangePrice(params) {
    return {
        type: SET_RANGE_PRICE,
        payload: params,
    };
}

export function setCurrentPage(params) {
    return {
        type: SET_CURRENT_PAGE,
        payload: params,
    };
}

export function setRate(params) {
    return {
        type: SET_RATE,
        payload: params,
    };
}

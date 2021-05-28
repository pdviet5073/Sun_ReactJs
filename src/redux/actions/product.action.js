import { GET_PRODUCT, GET_PRODUCT_FILTER } from "../constants";

export function getProduct(params) {
    return {
        type: GET_PRODUCT,
        payload: params,
    };
}

export function getProductFilter(params) {
    return {
        type: GET_PRODUCT_FILTER,
        payload: params,
    };
}

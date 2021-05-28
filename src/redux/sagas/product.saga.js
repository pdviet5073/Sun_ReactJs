import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import {
    GET_PRODUCT,
    GET_PRODUCT_FAIL,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FILTER,
    GET_PRODUCT_FILTER_FAIL,
    GET_PRODUCT_FILTER_SUCCESS,
} from "../constants";

const apiUrl = process.env.REACT_APP_API_URL;

function* getProductSaga(action) {
    try {
        const { page, limit, categories, rate, type, brand, rangePrice, searchKey, sortPrice } =
            action.payload;
        const response = yield axios({
            method: "GET",
            url: `${apiUrl}/products`,
            params: {
                ...(page && { _page: page }),
                ...(limit && { _limit: limit }),
                ...(categories?.idParentCategories && { parentType: categories.idParentCategories }),
                ...(categories?.idChildrenCategories && {
                    childrenType: categories.idChildrenCategories,
                }),
                ...(rate && { rate }),
                ...(type && { type_like: type }),
                ...(brand && { brand_like: brand }),
                ...(rangePrice && { price_gte: rangePrice[0], price_lte: rangePrice[1] }),
                ...(searchKey && { q: searchKey }),
                ...(sortPrice && { _sort: "price", _order: sortPrice }),
            },
        });
        const data = response.data;

        yield put({
            type: GET_PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        yield put({
            type: GET_PRODUCT_FAIL,
            payload: error,
        });
    }
}

function* getProductFilterSaga(action) {
    try {
        const { categories, rate, type, brand, rangePrice, searchKey, sortPrice } = action.payload;
        const response = yield axios({
            method: "GET",
            url: `${apiUrl}/products`,
            params: {
                ...(categories?.idParentCategories && { parentType: categories.idParentCategories }),
                ...(categories?.idChildrenCategories && {
                    childrenType: categories.idChildrenCategories,
                }),
                ...(rate && { rate }),
                ...(type && { type_like: type }),
                ...(brand && { brand_like: brand }),
                ...(rangePrice && { price_gte: rangePrice[0], price_lte: rangePrice[1] }),
                ...(searchKey && { q: searchKey }),
                ...(sortPrice && { _sort: "price", _order: sortPrice }),
            },
        });
        const data = response.data;

        yield put({
            type: GET_PRODUCT_FILTER_SUCCESS,
            payload: data.length,
        });
    } catch (error) {
        yield put({
            type: GET_PRODUCT_FILTER_FAIL,
            payload: error,
        });
    }
}

export default function* productSaga() {
    yield takeEvery(GET_PRODUCT, getProductSaga);
    yield takeEvery(GET_PRODUCT_FILTER, getProductFilterSaga);
}

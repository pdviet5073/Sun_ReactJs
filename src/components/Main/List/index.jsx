import React, { useEffect } from "react";
import { connect } from "react-redux";

import ProductItem from "./ProductItem";

import { getProduct, getProductFilter, setSortPrice, setCurrentPage } from "../../../redux/actions";

import "./styles.css";

const List = ({
    categories,
    rate,
    type,
    brand,
    rangePrice,
    searchKey,
    sortPrice,
    currentPage,
    setSortPrice,
    setCurrentPage,

    productList,
    getProduct,
    lengthProductFilter,
    getProductFilter,
}) => {
    useEffect(() => {
        getProduct({
            page: currentPage,
            limit: 12,
            categories,
            rate,
            type,
            brand,
            rangePrice,
            searchKey,
            sortPrice,
        });
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, [currentPage, searchKey, categories, rate, type, brand, rangePrice, sortPrice]);

    useEffect(() => {
        getProductFilter({
            categories,
            rate,
            type,
            brand,
            rangePrice,
            searchKey,
        });
    }, [categories, rate, type, brand, rangePrice, searchKey]);
    const renderProduct = (data) => {
        return data?.map((item, index) => {
            return <ProductItem key={`product-${index}`} data={item} searchKey={searchKey} />;
        });
    };

    const renderPagination = () => {
        const length = lengthProductFilter;
        const temp = length % 12;
        let amount = Math.floor(length / 12);
        let temPagination = [];

        if (temp) amount += 1;
        for (let i = 0; i < amount; i++) {
            temPagination[i] = i + 1;
        }

        const arrPagination = ["Previous page", ...temPagination, "Next page"];
        return arrPagination.map((item, index) => {
            return (
                <li key={`pagination-${index}`}>
                    <button
                        className={`btn pagination-item ${
                            item === currentPage
                                ? "pagination-item-active"
                                : item === "Previous page" && currentPage === 1
                                ? "pagination-item-disable"
                                : ""
                        } `}
                        key={`pagination-${index}`}
                        onClick={() => onClickPagination(item)}
                    >
                        {index === 0 ? `< ${item}` : index === arrPagination.length - 1 ? `${item} >` : item}
                    </button>
                </li>
            );
        });
    };

    const onClickPagination = (value) => {
        switch (value) {
            case "Previous page":
                if (currentPage === 1) break;
                else setCurrentPage(currentPage - 1);
                break;
            case "Next page":
                setCurrentPage(currentPage + 1);
                break;
            default:
                setCurrentPage(value);
        }
    };

    const handelChangeSelect = (e) => {
        const value = e.target.value;
        setSortPrice(value);
        setCurrentPage(1);
    };

    return (
        <div className="list">
            <div className="container-fluid">
                <section className="list-sort px-4">
                    <p className="list-sort-text">{`${lengthProductFilter} results`}</p>

                    <div className="list-select">
                        <label>Sort by</label>
                        <select defaultValue="" onChange={(e) => handelChangeSelect(e)}>
                            <option value="">Featured</option>
                            <option value="asc">Price asc</option>
                            <option value="desc">Price desc</option>
                        </select>
                    </div>
                </section>
                <section className="list-product mt-5 px-4">
                    <div className="row">{renderProduct(productList)}</div>
                </section>
                {lengthProductFilter > 12 && (
                    <section className="pagination">
                        <ul className="pagination-list">{renderPagination()}</ul>
                    </section>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const { productList, lengthProductFilter } = state.productReducer;
    const { currentPage, searchKey, categories, rate, type, brand, rangePrice, sortPrice } =
        state.filterReducer;

    return {
        productList,
        lengthProductFilter,
        currentPage,
        searchKey,
        categories,
        rate,
        type,
        brand,
        rangePrice,
        sortPrice,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getProduct: (params) => dispatch(getProduct(params)),
        getProductFilter: (params) => dispatch(getProductFilter(params)),
        setSortPrice: (params) => dispatch(setSortPrice(params)),
        setCurrentPage: (params) => dispatch(setCurrentPage(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);

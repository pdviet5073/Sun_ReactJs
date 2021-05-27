import React, { useEffect, useState, useRef } from "react";
import ProductItem from "./ProductItem";
import axios from "axios";

import "./styles.css";

const List = ({
    categories,
    rate,
    type,
    brand,
    rangePrice,
    searchKey,
    setSortPrice,
    sortPrice,
    currentPage,
    setCurrentPage,
}) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [lengthProductFilter, setLengthProductFilter] = useState(0);
    const [productData, setProductData] = useState([]);
    const lengthProduct = useRef(0);

    useEffect(() => {
        getProductList({});
    }, []);

    useEffect(() => {
        getProductList({
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
    }, [currentPage, searchKey, categories, rate, type, brand, rangePrice, sortPrice]);

    useEffect(() => {
        getProductList({
            categories,
            rate,
            type,
            brand,
            rangePrice,
            searchKey,
            sortPrice,
        });
    }, [searchKey, categories, rate, type, brand, rangePrice, sortPrice]);

    const getProductList = async ({
        page,
        limit,
        categories,
        rate,
        type,
        brand,
        rangePrice,
        searchKey,
        sortPrice,
    }) => {
        setLengthProductFilter(0);
        try {
            const response = await axios({
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
            if (page) setProductData(data);
            else if (categories || rate || type || brand || rangePrice || searchKey || sortPrice)
                setLengthProductFilter(data.length);
            if (!page) lengthProduct.current = data.length;
        } catch (error) {
            return error;
        }
    };

    const renderProduct = (data) => {
        return data.map((item, index) => {
            return <ProductItem key={`product-${index}`} data={item} />;
        });
    };

    const renderPagination = () => {
        const length = lengthProductFilter || lengthProduct.current;
        const temp = length % 12;
        let amount = Math.floor(length / 12);
        if (temp) {
            amount += 1;
        }
        let temPagination = [];
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
                if (currentPage === 1) return;
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
                    <div className="row">{renderProduct(productData)}</div>
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

export default List;

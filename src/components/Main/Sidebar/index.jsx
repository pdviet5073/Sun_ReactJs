import React, { useState } from "react";
import { connect } from "react-redux";

import Star from "../../Star";

import { AiOutlineClear } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";

import {
    setBrand,
    setType,
    setRate,
    setRangePrice,
    setCategories,
    setCurrentPage,
    setSortPrice,
    setSearchKey,
} from "../../../redux/actions";

import "./styles.css";

const categoriesData = [
    {
        id: 1,
        name: " Appliances",
        list: [
            { id: 1, name: " Dishwashers" },
            { id: 2, name: "Fans" },
            { id: 3, name: "Freezers & Ice Makers" },
            { id: 4, name: " Heaters " },
            { id: 5, name: " Humidifiers " },
            { id: 6, name: " Microwaves " },
            { id: 7, name: " Ranges, Cooktops & Ovens " },
            { id: 8, name: " Refrigerators " },
            { id: 9, name: " Small Kitchen Appliances " },
            { id: 10, name: " Washers & Dryers " },
        ],
    },
    {
        id: 2,
        name: " Audio",
        list: [
            { id: 1, name: " Auxiliary Input Cables " },
            { id: 2, name: " Cables & Chargers " },
            { id: 3, name: " Cases & Armbands " },
            { id: 4, name: " Docks, Radios & Boomboxes " },
            { id: 5, name: " FM Transmitters " },
            { id: 6, name: " Headphones " },
            { id: 7, name: " Home Audio " },
            { id: 8, name: " Home Audio Accessories " },
            { id: 9, name: " In-Home Speakers " },
        ],
    },
    { id: 3, name: " Cameras & Camcorders" },
    { id: 4, name: " Car Electronics & GPS" },
    { id: 5, name: " Cell Phones" },
    { id: 6, name: " Computers & Tablets" },
    { id: 7, name: " Health, Fitness & Beauty" },
];
const typeData = [
    { id: 1, name: "Coffee/cappuccino" },
    { id: 2, name: "Food" },
    { id: 3, name: "Blenders" },
    { id: 4, name: "Multicookers" },
    { id: 5, name: "Portable beverage" },
];
const brandData = [
    { id: 1, name: "Hamilton Beach" },
    { id: 2, name: "KitchenAid" },
    { id: 3, name: "Cuisinart" },
    { id: 4, name: "Keurig" },
    { id: 5, name: "Black & Decker" },
];

const rangePriceData = [
    "$1 - 80",
    "$80 - 160",
    "$160 - 240",
    "$240 - 1.820",
    "$1.820 - 3.400",
    "$3.400 - 4.980",
    "> $4.980",
];

const Sidebar = ({
    setSearchKey,
    setRangePrice,
    setBrand,
    setType,
    setRate,
    setCategories,
    setCurrentPage,
    brand,
    type,
    categories,
}) => {
    const [isActive, setIsActive] = useState({});
    const [isFilter, setIsFilter] = useState(false);
    const [isChecked, setIsChecked] = useState({});

    const handelCategoriesClick = (id) => {
        setIsFilter(true);
        setCurrentPage(1);
        setCategories({
            idParentCategories: id,
        });
    };

    const handelTypeBrandClick = (e, typeClick) => {
        const value = e.target.value;
        const valueCheckbox = (state, setState) => {
            const index = state.findIndex((itemId) => itemId === value);
            if (index === -1) {
                setState([...state, value]);
            } else {
                const newState = state;
                newState.splice(index, 1);
                setState([...newState]);
            }
        };
        if (typeClick === "type") {
            valueCheckbox(type, setType);
        } else {
            valueCheckbox(brand, setBrand);
        }
        setCurrentPage(1);
        setIsFilter(true);
    };

    const handelRangerPriceClick = (index) => {
        setIsActive({
            ...isActive,
            range: index,
        });
        switch (index) {
            case 0:
                setRangePrice([1, 80]);
                break;
            case 1:
                setRangePrice([80, 160]);
                break;
            case 2:
                setRangePrice([160, 240]);
                break;
            case 3:
                setRangePrice([240, 1820]);
                break;
            case 4:
                setRangePrice([1820, 3400]);
                break;
            case 5:
                setRangePrice([3400, 4980]);
                break;
            case 6:
                setRangePrice([4980, 90000000000000000000000000]);
                break;
            default:
                break;
        }
        setCurrentPage(1);

        setIsFilter(true);
    };

    const handelRateClick = (value) => {
        setRate(value);
        setIsActive({
            ...isActive,
            rate: value,
        });
        setCurrentPage(1);

        setIsFilter(true);
    };

    const handelClearFilter = () => {
        setSearchKey("");
        setRangePrice([]);
        setBrand([]);
        setType([]);
        setRate();
        setCategories({});
        setSortPrice();
        setIsActive({});
        setIsChecked({});
        setIsFilter(false);
    };

    const renderCategories = () => {
        return categoriesData.map((item, index) => {
            return (
                <li className="categories-item text-clamp text-clamp--1" key={`categories-${index}`}>
                    <a
                        href="#"
                        onClick={() => handelCategoriesClick(item.id)}
                        className={`${categories.idParentCategories === item.id && "sidebar-active "}`}
                    >
                        {item.name}
                    </a>
                    {item.list && (
                        <ul
                            className={`categories-dropdown ${
                                categories.idParentCategories === item.id && "categories-dropdown-active"
                            }`}
                        >
                            {item.list.map((itemChildren, indexChildren) => {
                                return (
                                    <li
                                        className={`categories-item text-clamp text-clamp--1 ${
                                            categories.idChildrenCategories === itemChildren.id &&
                                            "sidebar-active"
                                        }`}
                                        key={`categories-dropdown-${indexChildren}`}
                                        onClick={() =>
                                            setCategories({
                                                idParentCategories: item.id,
                                                idChildrenCategories: itemChildren.id,
                                            })
                                        }
                                    >
                                        {itemChildren.name}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </li>
            );
        });
    };

    const renderSoft = (data, typeClick) => {
        return data.map((item, index) => {
            return (
                <li className="sort-item" key={`soft-${index}`}>
                    <input
                        type="checkbox"
                        className="mr-1"
                        id={item.name}
                        value={item.id}
                        onChange={(e) => handelTypeBrandClick(e, typeClick)}
                        checked={
                            (typeClick == "type" ? type : brand).findIndex((id) => id == item.id) !== -1
                                ? true
                                : false
                        }
                    ></input>
                    <label htmlFor={item.name}>{item.name}</label>
                </li>
            );
        });
    };

    const renderStar = () => {
        const arrStar = [5, 4, 3, 2, 1];
        return arrStar.map((item, index) => (
            <li
                className="rate-item"
                key={`rate-${index}`}
                onClick={() => handelRateClick(item)}
                className={`${isActive.rate === item && "rate-active"}`}
            >
                <Star rate={item}></Star>
            </li>
        ));
    };

    const renderRangePrice = () => {
        return rangePriceData.map((item, index) => (
            <li
                className="price-item"
                onClick={() => handelRangerPriceClick(index)}
                className={`${isActive.range == index && "sidebar-active"}`}
            >
                {item}
            </li>
        ));
    };

    return (
        <aside className="sidebar">
            <form>
                {isFilter && (
                    <div className="clear-filter" onClick={() => handelClearFilter()}>
                        <AiOutlineClear />
                        Clear all filters
                    </div>
                )}

                <section className="categories">
                    <h3 className="categories-title">Show results for</h3>
                    <ul className="categories-container">{renderCategories()}</ul>
                </section>
                <section className="sort">
                    <h3>Refine by</h3>
                    <h2 className="categories-title">Type</h2>
                    <div className="categories-container">{renderSoft(typeData, "type")}</div>

                    <h2 className="categories-title">Brand</h2>
                    <div className="sort-search">
                        <button className="btn ">
                            <BiSearchAlt2 />
                        </button>
                        <input className="header-input" />
                    </div>
                    <div className="categories-container">{renderSoft(brandData, "brand")}</div>
                </section>
                <section className="rate">
                    <h2 className="categories-title">Rating</h2>
                    <div className="categories-container">
                        <ul className="rate-list">{renderStar()}</ul>
                    </div>
                </section>
                <section className="price">
                    <h2 className="categories-title">Prices</h2>
                    <div className="categories-container">
                        <ul className="price-list">{renderRangePrice()}</ul>
                        <div className="price-range">
                            <span>$ </span>
                            <input type="number" />
                            <span> to $ </span>
                            <input type="number" />
                            <button>Go</button>
                        </div>
                    </div>
                </section>
            </form>
        </aside>
    );
};
const mapStateToProps = (state) => {
    const { type, brand, categories, rate, rangePrice, searchKey } = state.filterReducer;
    return {
        type,
        brand,
        categories,
        rate,
        rangePrice,
        searchKey,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setBrand: (params) => dispatch(setBrand(params)),
        setType: (params) => dispatch(setType(params)),
        setRate: (params) => dispatch(setRate(params)),
        setRangePrice: (params) => dispatch(setRangePrice(params)),
        setCategories: (params) => dispatch(setCategories(params)),
        setCurrentPage: (params) => dispatch(setCurrentPage(params)),
        setSortPrice: (params) => dispatch(setSortPrice(params)),
        setSearchKey: (params) => dispatch(setSearchKey(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

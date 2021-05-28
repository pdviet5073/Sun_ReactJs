import React from "react";
import Star from "../../../Star";
import "./styles.css";
const productItem = ({ data, searchKey }) => {
    console.log("file: index.jsx > line 5 > productItem > searchKey", searchKey);
    const { img, name, price, rate } = data;
    const nameUpdate = name.replace(searchKey, `<em className='search-key'>${searchKey}</em> `);
    const result = name.split(`${searchKey}`).map((text, index) => {
        return (
            <>
                <span>{text}</span>
                <em className="search-key">{searchKey}</em>
            </>
        );
    });
    // console.log("file: index.jsx > line 8 > productItem > nameUpdate", nameUpdate);
    return (
        <div className="col-xl-3 col-lg-4 col-md-6 col-12">
            <div className="product-item">
                <div className="product-img">
                    <img src={img} alt="img product"></img>
                </div>
                <div className="product-content">
                    <div className="product-name">
                        <h3>{name}</h3>
                    </div>
                    <div className="product-bottom">
                        <Star rate={rate}></Star>
                        <p className="product-price">${price}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default productItem;

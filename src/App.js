import "./App.css";
import React, { useState, useEffect } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Main/Sidebar";
import List from "./components/Main/List";

function App() {
    const [searchKey, setSearchKey] = useState("");
    const [categories, setCategories] = useState({});
    const [rate, setRate] = useState();
    const [type, setType] = useState([]);
    const [brand, setBrand] = useState([]);
    const [rangePrice, setRangePrice] = useState([]);
    const [sortPrice, setSortPrice] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="App">
            <Header setSearchKey={setSearchKey}></Header>
            <main className="main">
                {" "}
                <Sidebar
                    setCategories={setCategories}
                    setRate={setRate}
                    setType={setType}
                    setBrand={setBrand}
                    setRangePrice={setRangePrice}
                    categories={categories}
                    rate={rate}
                    type={type}
                    brand={brand}
                    rangePrice={rangePrice}
                    setSortPrice={setSortPrice}
                    setCurrentPage={setCurrentPage}
                ></Sidebar>
                <List
                    setSortPrice={setSortPrice}
                    sortPrice={sortPrice}
                    searchKey={searchKey}
                    categories={categories}
                    rate={rate}
                    type={type}
                    brand={brand}
                    rangePrice={rangePrice}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                ></List>
            </main>
        </div>
    );
}

export default App;

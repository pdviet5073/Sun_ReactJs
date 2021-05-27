import React, { useRef, useState } from "react";
import logo from "../../assets/images/logo.png";
import { BiSearchAlt2 } from "react-icons/bi";

import "./styles.css";

const Header = ({ setSearchKey }) => {
    const [value, setValue] = useState("");
    const typingTimeoutRef = useRef(null);

    const getSearchKey = (e) => {
        const valueInput = e.target.value;
        setValue(valueInput);

        if (value) {
            clearTimeout(typingTimeoutRef.current);

            typingTimeoutRef.current = setTimeout(() => {
                setSearchKey(valueInput);
            }, 800);
        }
    };

    return (
        <header className="header">
            <div className="wrapper">
                <div className="header-container">
                    <a href="#">
                        <img src={logo} alt="logo" className="logo"></img>
                    </a>
                    <a href="#" className="logo-text">
                        amazing
                    </a>
                    <div className="header-search">
                        <input
                            className="header-input"
                            placeholder="Search a product"
                            value={value}
                            onChange={getSearchKey}
                        />
                        <button className="btn ">
                            <BiSearchAlt2 />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

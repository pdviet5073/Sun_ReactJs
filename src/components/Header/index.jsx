import React, { useRef, useState } from "react";

import { connect } from "react-redux";
import { setSearchKey, setCurrentPage } from "../../redux/actions";

import logo from "../../assets/images/logo.png";
import { BiSearchAlt2 } from "react-icons/bi";

import "./styles.css";

const Header = ({ setSearchKey, setCurrentPage }) => {
    const [value, setValue] = useState("");
    const typingTimeoutRef = useRef(null);

    const getSearchKey = (e) => {
        const valueInput = e.target.value;
        setValue(valueInput);

        clearTimeout(typingTimeoutRef.current);

        typingTimeoutRef.current = setTimeout(() => {
            setSearchKey(valueInput);
            setCurrentPage(1);
        }, 800);
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
                            type="text"
                            className="header-input"
                            placeholder="Search a product"
                            value={value}
                            onChange={(e) => getSearchKey(e)}
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

const dispatchStateToProps = (dispatch) => {
    return {
        setSearchKey: (params) => dispatch(setSearchKey(params)),
        setCurrentPage: (params) => dispatch(setCurrentPage(params)),
    };
};

export default connect(null, dispatchStateToProps)(Header);

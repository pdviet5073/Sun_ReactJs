import "./App.css";
import React from "react";

import Header from "./components/Header";
import Sidebar from "./components/Main/Sidebar";
import List from "./components/Main/List";

function App() {
    return (
        <div className="App">
            <Header></Header>
            <main className="main">
                {" "}
                <List></List>
                <Sidebar></Sidebar>
            </main>
        </div>
    );
}

export default App;

import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

import myReducer from "./redux/reducers";
import mySaga from "./redux/sagas";

import "bootstrap/dist/css/bootstrap.css";
import "./reset.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const sagaMiddleware = createSagaMiddleware();
const myStore = createStore(myReducer, applyMiddleware(...[sagaMiddleware, logger]));
sagaMiddleware.run(mySaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={myStore}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();

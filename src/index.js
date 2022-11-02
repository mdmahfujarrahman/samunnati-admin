import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { ChildrenContextProvider } from "./context/ChildrenContext";
import './index.css';

ReactDOM.render(
    <ChildrenContextProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </ChildrenContextProvider>,
    document.getElementById("root")
);

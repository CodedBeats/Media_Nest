import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
// import Cryptyogram from "./pages/cryptogram/Cryptyogram";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/cryptogram" element={<Cryptyogram />} /> */}
            </Routes>
        </Router>
    );
};

export default App;

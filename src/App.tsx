import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Manga from "./pages/Manga";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Login from "./pages/Login";

// cpmponents
import Navbar from "./components/common/Navbar";


const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/manga" element={<Manga />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/series" element={<Series />} />

                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Component/Header";
import Home from "./Component/Home.jsx";
import Coins from "./Component/Coins.jsx";
import Exchanges from "./Component/Exchanges";
import CoinDetails from "./Component/CoinDetails";
import Footer from "./Component/Footer";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/coins"} element={<Coins />} />
          <Route path={"/exchanges"} element={<Exchanges />} />
          <Route path={"/coin/:id"} element={<CoinDetails />} />
          <Route path={"/*"} element={"404 Error Page"} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;

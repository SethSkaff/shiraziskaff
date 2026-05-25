import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import About from "./pages/About";
import AirMix from "./pages/AirMix";
import Careers from "./pages/Careers";
import Coach from "./pages/Coach";
import Contact from "./pages/Contact";
import Crave from "./pages/Crave";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export default function App() {
  const location = useLocation();

  return (
    <div className="app-shell">
      <Nav />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/products/coach" element={<Coach />} />
        <Route path="/products/airmix" element={<AirMix />} />
        <Route path="/products/crave" element={<Crave />} />
        <Route path="/about" element={<About />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

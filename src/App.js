import { Route, Routes } from "react-router-dom";
import Footer from "./component/Shared/Footer/Footer";
import Header from "./component/Shared/Header/Header";
import About from "./pages/About/About";
import Appointment from "./pages/Appointment/Appointment";
import ContactUs from "./pages/ContactUs/ContactUs";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Register from "./pages/Register/Register";
import Reviews from "./pages/Reviews/Reviews";

function App() {
  return (
    <div className="text-black">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route
          path="/appointment"
          element={
              <Appointment />
          }
        />
        {/* <Route
          path="/appointment"
          element={
            <RequireAuth>
              <Appointment />
            </RequireAuth>
          }
        /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

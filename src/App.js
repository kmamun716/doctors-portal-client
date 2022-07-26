import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequireAdmin from "./component/Auth/RequireAdmin";
import RequireAuth from "./component/Auth/RequireAuth";
import Footer from "./component/Shared/Footer/Footer";
import Header from "./component/Shared/Header/Header";
import About from "./pages/About/About";
import Appointment from "./pages/Appointment/Appointment";
import ContactUs from "./pages/ContactUs/ContactUs";
import Dashboard from "./pages/Dashboard/Dashboard";
import MyAppointments from "./pages/Dashboard/MyAppointments";
import MyHistory from "./pages/Dashboard/MyHistory";
import MyReview from "./pages/Dashboard/MyReview";
import Users from "./pages/Dashboard/Users";
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
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route index element={<MyAppointments/>} />
          <Route path="review" element={<MyReview/>} />
          <Route path="history" element={<MyHistory/>} />
          <Route path="users" element={<RequireAdmin><Users/></RequireAdmin>} />
        </Route>
        <Route
          path="/appointment"
          element={
            <RequireAuth>
              <Appointment />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;

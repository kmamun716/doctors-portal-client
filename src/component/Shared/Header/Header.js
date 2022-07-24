import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useLocation } from "react-router-dom";
import auth from "../../../firebase.config";

const Header = () => {
  const [user] = useAuthState(auth);
  const location = useLocation();
  return (
    <div>
      <div className="navbar bg-slate-400">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex="0" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex="0"
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-orange-200 rounded-box w-52"
            >
                  <li><Link to='/' className={location.pathname==='/'?'btn hover:bg-sky-700':''}>Home</Link></li>
                  <li><Link to='/about' className={location.pathname==='/about'?'btn hover:bg-sky-700':''}>About</Link></li>
                  <li><Link to='/appointment' className={location.pathname==='/appointment'?'btn hover:bg-sky-700':''}>Appointment</Link></li>
                  <li><Link to='/reviews' className={location.pathname==='/reviews'?'btn hover:bg-sky-700':''}>Reviews</Link></li>
                  <li><Link to='/contact-us' className={location.pathname==='/contact-us'?'btn hover:bg-sky-700':''}>Contact Us</Link></li>
                  <li>{user?.email ? <p>Log Out</p>: <Link to='/login' className={location.pathname==='/login'?'btn hover:bg-sky-700':''}>Login</Link>}</li>
            </ul>
          </div>
          <Link to='/' className="btn btn-ghost normal-case text-xl">Doctors Portal</Link>
        </div>
        <div className="navbar-end hidden lg:block">
          <ul className="menu menu-compact dropdown-content lg:menu-horizontal p-0">
          <li><Link to='/' className={location.pathname==='/'?'btn hover:bg-sky-700':''}>Home</Link></li>
          <li><Link to='/about' className={location.pathname==='/about'?'btn hover:bg-sky-700':''}>About</Link></li>
          <li><Link to='/appointment' className={location.pathname==='/appointment'?'btn hover:bg-sky-700':''}>Appointment</Link></li>
          <li><Link to='/reviews' className={location.pathname==='/reviews'?'btn hover:bg-sky-700':''}>Reviews</Link></li>
          <li><Link to='/contact-us' className={location.pathname==='/contact-us'?'btn hover:bg-sky-700':''}>Contact Us</Link></li>
          <li>{user?.email ? <p onClick={()=>signOut(auth)}>Log Out</p>: <Link to='/login' className={location.pathname==='/login'?'btn hover:bg-sky-700':''}>Login</Link>}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;

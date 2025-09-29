import React, { Fragment }  from "react";
import "./Navbar.css";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { TbSquareRoundedLetterB } from "react-icons/tb";
import { FaBars } from 'react-icons/fa'
import { useState } from "react";
import { ImCross } from 'react-icons/im' 
import Footer from "./Footer";
import LoginChoice from "./LoginChoice";
const Navbar = () => {
  const [Mobile ,setMobile] = useState(false)
  const[choicePopup,setchoicePopup]=useState(false)
  return (
    <Fragment>
      <nav className='navbar'>
      <div className='container relative'>
      <TbSquareRoundedLetterB className="logo-icon"  size={40}/>        
      <h3  className='logo'>
          BIT</h3>
          <ul className={Mobile ? "nav-links-mobile" : "nav-links"} onClick={() => setMobile(false)}>
  <li>
    <Link to="/" className="text-gray-600 hover:text-blue-500  font-semibold">
      HOME
    </Link>
  </li>
  <li>
    <Link to="/about" className="text-gray-600 hover:text-blue-500  font-semibold">
      ABOUT
    </Link>
  </li>
  <li>
    <Link to="/services" className="text-gray-600 hover:text-blue-500  font-semibold">
      SERVICES
    </Link>
  </li>
  <li>
    <button
      className="bg-gray-600 px-3 py-0.5 hover:bg-blue-600 text-gray-100 rounded-md font-semibold"
      onClick={() => {
        setchoicePopup((prevValue) => !prevValue);
      }}
    >
      LOGIN
    </button>
  </li>
</ul>
        <button className='mobile-menu-icon' onClick={() => setMobile(!Mobile)} >
          {Mobile? <ImCross/> : <FaBars />}
         

        </button>
      </div> 
    </nav>
    
    {choicePopup && <LoginChoice/>}
    <Outlet />
    <div className="">
   
    </div>
    </Fragment>
    
  )
}

export default Navbar;

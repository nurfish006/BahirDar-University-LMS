import React from "react";
import { Menu } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
//import "./Navbar.css";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { TbSquareRoundedLetterB } from "react-icons/tb";
import { FaBars } from 'react-icons/fa'
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../../context";
import { ImCross } from 'react-icons/im'
import { CgProfile } from "react-icons/cg"

const TLoggedinNavbar = () => {
 
  const [Mobile, setMobile] = useState(false)
  const { Item, SubMenu, ItemGroup } = Menu;

  const { state, dispatch } = useContext(Context);
  const navigate = useNavigate();
  //SESSION
  const {
    state: { teacher },
  } = useContext(Context);


  // useEffect(() => {
  //   if (teacher === null) navigate("/teacherslogin");
  // }, [teacher]);

  const teacherslogout = async () => {
    dispatch({ type: "LOGOUT_TEACHER" });
    window.localStorage.removeItem("teacher");
    const { data } = await axios.get(`http://localhost:8000/api/teacherslogout`);
    toast(data.message);
    navigate("/teacherslogin");
  };

  return (
    <>

      <Menu>
        <nav className='navbar'>
          <div className='container'>
            <TbSquareRoundedLetterB className="logo-icon" size={55} />
            
            <h3 className='logo'>
              BIT</h3>
            <ul className={Mobile ? "nav-links-mobile" : 'nav-links'} onClick={() => setMobile(false)}>
              <Link to='/teacher'><li>HOME</li></Link>
         
              <Link to='/teacher/ce'><li>CE DEPARTMENT</li></Link>
              <Link to='/teacher/ce'><li>EE DEPARTMENT</li></Link>
           
            </ul>
            {teacher !== null && (
              <SubMenu
                icon={<CgProfile />}
                title={teacher && teacher.fname}
                className="float-right bg-gray-500 text-lg"
              >
                <ItemGroup>
                
                  <Item onClick={teacherslogout} className="float-right">
                    Logout
                  </Item>
                </ItemGroup>
              </SubMenu>
            )}
            <button className='mobile-menu-icon' onClick={() => setMobile(!Mobile)} >
              {Mobile ? <ImCross /> : <FaBars />}

            </button>
          </div>
        </nav>
      </Menu>
      <Outlet />
    </>
  )
}

export default TLoggedinNavbar;

import React from "react";
import { Menu } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
//import  StudNav from "./StudentNavbar";
//import "./Navbar.css";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { TbSquareRoundedLetterB } from "react-icons/tb";
import { FaBars } from 'react-icons/fa'
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../../../context";
import { ImCross } from 'react-icons/im'
import { CgProfile } from "react-icons/cg"

const Navbar = () => {
 
  const [Mobile, setMobile] = useState(false)

  const { Item, SubMenu, ItemGroup } = Menu;
  const { state, dispatch } = useContext(Context);
  const navigate = useNavigate();

  //Session
  const {
    state: { student },
  } = useContext(Context);
  // useEffect(() => {
  //   if (student === null) 
  //   navigate("/studentLogin");
  //  }, [student]);

  const studentlogout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("student");
    const { data } = await axios.get(`http://localhost:8000/api/studentlogout`);
    toast(data.message);
    navigate("/studentlogin");
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
              <Link to='/student/ee'><li>HOME</li></Link>
              <Link to='/student/ee/mycourse'><li>MY COURSE</li></Link>
              <Link to='/student/ee/coursematerial'><li>DOWNLOAD </li></Link>
              <Link to='/student/ee/class'><li>CLASS</li></Link>
              <Link to='/student/ee/assignment'><li>ASSIGNMENT</li></Link>
              <Link to='/student/ee/chat'><li>CHAT</li></Link>
              <Link to='/student/ee/news'><li>NEWS</li></Link>
            </ul>
            {student !== null && (
              <SubMenu
                icon={<CgProfile />}
                title={student && student.fname}
                className="float-right bg-gray-500 text-lg"
              >
                <ItemGroup>
                  <Item onClick={"/updatestudent"}>
                    
                      update profile
                
                  </Item>
                  <Item onClick={studentlogout} className="float-right">
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

export default Navbar;

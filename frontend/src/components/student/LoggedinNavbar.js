import React from "react";
import { Menu,Button } from "antd";
import aaa from "../../asset/aaa.jpg"
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
import HomeL from "./logedinstudent/HomeL";

const LoggedinNavbar = () => {
 
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
    <div className="">

      <Menu>
        <nav className='navbar '>
          <div className='container '>
            <TbSquareRoundedLetterB className="logo-icon" size={55} />
            <h3 className='logo'>
              BIT</h3>
            <ul className={Mobile ? "nav-links-mobile" : 'nav-links'} onClick={() => setMobile(false)}>
              <Link to='/student'><li>HOME</li></Link>
         
              <Link to='/student/department'><li>DEPARTMENT</li></Link>
           
            </ul>
            {student !== null && (
              <SubMenu
                icon={<CgProfile />}
                title={student && student.fname}
                className="float-right"
              >
                <ItemGroup>
                 
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
    
    </div>
  )
}

export default LoggedinNavbar;

///

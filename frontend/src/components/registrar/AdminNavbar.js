import React ,{useContext} from "react";
//import "./Navbar.css";
import { Menu } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { TbSquareRoundedLetterB } from "react-icons/tb";
import { FaBars } from 'react-icons/fa'
import { useState } from "react";
import { ImCross } from 'react-icons/im' 
import { CgProfile } from "react-icons/cg"
import { Context } from "../../context";
import axios from "axios";
import { toast } from "react-toastify";
const Navbar = () => {
  const [Mobile ,setMobile] = useState(false)
  const { Item, SubMenu, ItemGroup } = Menu;
  const { state, dispatch } = useContext(Context);
  const { admin } = state;
  const navigate = useNavigate();

  const adminlogout = async () => {
    dispatch({ type: "LOGOUT_ADMIN" });
    window.localStorage.removeItem("admin");
    const { data } = await axios.get(`http://localhost:8000/api/adminlogout`);
    toast(data.message);
    navigate("/adminlogin");
  };
  return (
    <Menu>
    <nav className='navbar bg-'>
      <div className='container '>
      <TbSquareRoundedLetterB className="logo-icon"  size={55}/>        
      <h3 className='logo'>
          BIT</h3>
        <ul className= {Mobile? "nav-links-mobile" : 'nav-links'} onClick={() =>setMobile(false)}>
          <Link to='/admin' className="text-gray-600 hover:text-blue-500  "><li>HOME</li></Link>
          <Link to='/admin/studentslist'className="text-gray-600 hover:text-blue-500  "><li>STUDENTS </li></Link>
          {/* <Link to='/coursematerial'><li>COURSE MARERIAL</li></Link> */}
          <Link to='/admin/teacherslist' className="text-gray-600 hover:text-blue-500  "><li>TEACHERS</li></Link>
          <Link to='/admin/headlist' className="text-gray-600 hover:text-blue-500  "><li>HEADS</li></Link>
          <Link to='/admin/adminlist' className="text-gray-600 hover:text-blue-500  "><li>ADMINS</li></Link>
          <Link to='/admin/addnews' className="text-gray-600 hover:text-blue-500  "><li>ADD NEWS</li></Link>
          <Link to='/admin/news' className="text-gray-600 hover:text-blue-500  "><li>NEWS</li></Link>
          <Link to='/admin/livechat' className="text-gray-600 hover:text-blue-500  "><li>CHAT</li></Link>
        </ul>
        {admin !== null && (
              <SubMenu
                icon={<CgProfile />}
                title={admin && admin.fname}
                className="float-right bg-gray-500 text-lg"
              >
                <ItemGroup>
                  
                  <Item onClick={adminlogout} className="float-right">
                    Logout
                  </Item>
                </ItemGroup>
              </SubMenu>
            )}
        <button className='mobile-menu-icon' onClick={() => setMobile(!Mobile)} >
          {Mobile? <ImCross/> : <FaBars />}
         

        </button>
      </div> 
    </nav>
    </Menu>
  )
}

export default Navbar;

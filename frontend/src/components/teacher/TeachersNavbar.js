import React ,{useContext,useState,useEffect} from "react";
//import "./Navbar.css";
import { Menu } from "antd";
import { Context } from "../../context";
import { useNavigate, Link } from "react-router-dom";
import { TbSquareRoundedLetterB } from "react-icons/tb";
import { FaBars } from 'react-icons/fa'
import axios from "axios";
import { toast } from "react-toastify";
import { ImCross } from 'react-icons/im' 
import { CgProfile } from "react-icons/cg"
const Navbar = () => {
  const [Mobile ,setMobile] = useState(false)
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
    <Menu>
    <nav className='navbar'>
      <div className='container'>
      <TbSquareRoundedLetterB className="logo-icon"  size={55}/>        
      <h3 className='logo'>
          BIT</h3>
        <ul className= {Mobile? "nav-links-mobile" : 'nav-links'} onClick={() =>setMobile(false)}>
          <Link to='/teacher/ce'><li>HOME</li></Link>
          <Link to='/teacher/ce/addcoursematerial'><li>ADD MATERIALS</li></Link>
          {/* <Link to='/coursematerial'><li>COURSE MARERIAL</li></Link> */}
         {/* /* <Link to='/teacher/ce/class'><li>CLASS</li></Link */}
          
          <Link to='/teacher/ce/materials'><li> MATERIALS</li></Link>
          <Link to='/teacher/ce/assignment'><li> ASSIGNMENT</li></Link>
          <Link to='/teacher/ce/chat'><li>CHAT</li></Link>
          <Link to='/teacher/ce/addnews'><li>Add News</li></Link>
          <Link to='/teacher/ce/news'><li>News</li></Link>
        
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
          {Mobile? <ImCross/> : <FaBars />}
         

        </button>
      </div> 
    </nav>
    </Menu>
  )
}

export default Navbar;

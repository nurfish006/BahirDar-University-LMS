import React ,{useContext,useState,useEffect} from "react";
//import "./Navbar.css";
import { useNavigate, Link } from "react-router-dom";
import { TbSquareRoundedLetterB } from "react-icons/tb";
import { FaBars } from 'react-icons/fa'
import { Context } from "../../../context";
import { ImCross } from 'react-icons/im'
import { Menu } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { CgProfile } from "react-icons/cg"
const EEDeptNav = () => {
  const [Mobile, setMobile] = useState(false)
  const { Item, SubMenu, ItemGroup } = Menu;
  const { state, dispatch } = useContext(Context);
  const navigate = useNavigate();
//SESSION
  const {
    state: { head },
  } = useContext(Context);
  // useEffect(() => {
  //   if (head === null) navigate("/headlogin");
  //  }, [head]);

  const headlogout = async () => {
    dispatch({ type: "LOGOUT_HEAD" });
    window.localStorage.removeItem("head");
    const { data } = await axios.get(`http://localhost:8000/api/headlogout`);
    toast(data.message);
    navigate("/headlogin");
  };
  return (
  
    <Menu>
    <nav className='navbar'>
      <div className='container'>
        <TbSquareRoundedLetterB className="logo-icon" size={55} />
        <h3 className='logo'>
          BIT</h3>
        <ul className={Mobile ? "nav-links-mobile" : 'nav-links'} onClick={() => setMobile(false)}>
          <Link to='/head/ee'><li>HOME</li></Link>
          <Link to='/head/ee/addcourse'><li>ADD COURSE</li></Link>
          <Link to='/head/ee/courses'><li>COURSES</li></Link>
          <Link to='/head/ee/news'><li>ADD NEWS</li></Link>
          <Link to='/head/ee/addnews'><li> NEWS</li></Link>
          
          <Link to='/head/ee/chat'><li>CHAT</li></Link>
        </ul>
        {head !== null && (
              <SubMenu
                icon={<CgProfile />}
                title={head && head.fname}
                className="float-right  bg-gray-500 text-lg">
                <ItemGroup>
                 
                  <Item onClick={headlogout} className="float-right">
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
  )
}

export default EEDeptNav;
{/* <AiFillIeCircle color="black" size={65} className="mi" />
<p className='p1'> BIT-LMS</p>
*/}
import React from 'react'
import "../student/MyCourse";
import "../student/CourseMaterial";
import "../student/Class";
import "../student/Exam";
import "../student/Logout";
import { AiFillIeCircle } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";




const HeaderTwo = () => {
  return (
    <div> <div>
    <AiFillIeCircle color="blue" size={65} className="mi" />
    <p className='p1'> BIT</p>
   <ul>
      <li><Link to="/mycourse">MyCourse</Link></li>
      <li><Link to="/coursematerial">CourseMaterial</Link></li>
      <li><Link to="/class">Class</Link></li>
      <li> <Link to="/exam">EXAM</Link></li>
      <li> <Link to="/logout">LOGOUT</Link></li>

    </ul>
</div></div>
  )
}

export default HeaderTwo
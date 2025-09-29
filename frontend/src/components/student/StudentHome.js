import React ,{useContext,useEffect} from 'react'
import  StudentNavbar from "./StudentNavbar"
import { useNavigate } from 'react-router-dom'
import { Context } from '../../context'
import Footer from '../home/Footer'
import LoggedinNavbar from './LoggedinNavbar'
import Hwd from './Hwd'
import { Example } from './logedinstudent/HomeL'
import Contact from '../home/Contact'
const StudentHome = () => {
  const navigate = useNavigate();

  //Session
  // const {
  //   state: { student },
  // } = useContext(Context);
  // useEffect(() => {
  //   if (student === null) 
  //   navigate("/studentLogin");
  //  }, [student]);
  return (
    <div> 
        <LoggedinNavbar/>
        
        <Hwd/>
        <Example/>
        <Contact/>
        <Footer/>
        </div>
  )
}

export default StudentHome
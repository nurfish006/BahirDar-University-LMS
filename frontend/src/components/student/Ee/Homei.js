import React ,{useContext,useEffect}from 'react'
import LoggedinNavbar from '../LoggedinNavbar';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../../context';
import Hwd from './Hwd';
import Footer from '../../home/Footer';
import { Example } from '../logedinstudent/HomeL';
import  StudentNavbar from "./StudentNavbar"
const Homei = () => {
  const navigate = useNavigate();

  // //SESSION
  // const {
  //   state: { student },
  // } = useContext(Context);
  // useEffect(() => {
  //   if (student === null) 
  //   navigate("/studentLogin");
  //  }, [student]);
  return (
    <div>
        <StudentNavbar/>
        <Hwd />
        <Example />
       <Footer />
    </div>
  )
}

export default Homei;
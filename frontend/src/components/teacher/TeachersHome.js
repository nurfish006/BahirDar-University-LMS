import React ,{useContext,useEffect}from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context';
import TeachersNavbar from "./TeachersNavbar"
import Hwd from './Hwd';
import { Example } from './THome';
import Contact from '../home/Contact';
import Footer from '../home/Footer';
const Teachershome = () => {
  const navigate = useNavigate();
  //SESSION
  // const {
  //   state: { teacher },
  // } = useContext(Context);


  // useEffect(() => {
  //   if (teacher === null) navigate("/teacherslogin");
  // }, [teacher]);
  return (
    <div>

<TeachersNavbar/>

<Hwd/>
<Example/>
<Contact/>
<Footer/>
    </div>
  )
}

export default Teachershome;
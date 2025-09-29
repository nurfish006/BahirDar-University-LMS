import React ,{useContext,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../../../context';
import Hwd from '../Hwd';
import EeTeacherNav from "./EeTeacherNav"
import { Example } from '../THome';
import Contact from '../../home/Contact';
import Footer from '../../home/Footer';
const Teacherhomeee = () => {
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
<EeTeacherNav/>
<Hwd/>
<Example/>
<Contact/>
<Footer/>
    </div>
  )
}

export default Teacherhomeee;
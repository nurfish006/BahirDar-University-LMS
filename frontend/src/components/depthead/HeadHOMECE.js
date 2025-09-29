import React ,{useEffect,useContext}from 'react'
import DeptNav from './DeptNav';
import {useNavigate} from 'react-router-dom';
import Hwd from './Hwd';
import { Context } from '../../context';
import { Example } from './DeptHome';
import Contact from '../home/Contact';
import Footer from '../home/Footer';
const HeadHOMECE = () => {
  // const {
  //   state: { head },
  // } = useContext(Context);


  // const navigate=useNavigate();
  // useEffect(() => {
  //   if (head === null) navigate("/headlogin");
  // }, [head]);
  return (
    <div>
      <DeptNav />
      <Hwd />
<Example/>
<Contact/>
<Footer/>

    </div>
  )
}

export default HeadHOMECE;
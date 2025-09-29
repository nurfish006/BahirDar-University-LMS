import React ,{useEffect,useContext}from 'react'
import { Context } from '../../../context';
import EEDeptNav from './EEDeptNav'
import { Example } from '../DeptHome'
import {useNavigate} from 'react-router-dom';
import Hwd from '../Hwd';
import Contact from '../../home/Contact';
import Footer from '../../home/Footer'
const Depthomeee = () => {
  // const {
  //   state: { head },
  // } = useContext(Context);


  // const navigate=useNavigate();
  // useEffect(() => {
  //   if (head === null) navigate("/");
  // }, [head]);
  return (
    <div>

    <EEDeptNav />
    <Hwd />
<Example/>
<Contact/>
<Footer/>

  </div>
)
}

export default Depthomeee;
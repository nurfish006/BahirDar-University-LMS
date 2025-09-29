import React,{useEffect,useContext} from 'react'
import { Button } from 'antd'
import { Link,useNavigate } from 'react-router-dom'
import { Context } from '../../context'
import bdu from "../../asset/bdu.png"
import aaa from "../../asset/aaa.jpg"

const Hwd = () => {
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
          <div>
            <div className='flex justify-around items-center max-w-[1500px] mx-auto h-screen'>
<div >
<h1 className='text-black max-w-[900px] text-left'>Wellcome to our Student home page</h1>
<p className='max-w-[500px] '>dear students thanks for joing our lms site use this and save your priceless time </p>
<Button variant="primary" type="submit" className="flex mt-4 items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-5 px-4 rounded focus:outline-none focus:shadow-outline">
        <Link to="/student/course" className=''>Go to My Course</Link>
                </Button>
</div>
  <div className='bg-gray-400 overflow-hidden rounded-3xl shadow-slate-950 shadow-2xl'>
    <img src={bdu} className=' w-90 w-[500px] bg-cover'/>
  </div>
</div>
            </div>
    </div>
  )
}

export default Hwd
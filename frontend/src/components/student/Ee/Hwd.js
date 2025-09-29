import React,{useEffect,useContext} from 'react'
import { Button } from 'antd'
import { Context } from '../../../context'
import { Link,useNavigate } from 'react-router-dom'
import aaa from "../../../asset/aaa.jpg"
const Hwd = () => {
  const navigate = useNavigate();

  // //Session
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
<h1 className='text-black max-w-[900px] text-left'>Wellcome  to our electrical faculity Studnt home page</h1>
<p className='max-w-[500px] '>thanks for joing, dear student thanks for joing dear student thanks for joing dear studentthanks for joing dear student</p>
<Button variant="primary" type="submit" className="flex mt-4 items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-5 px-4 rounded focus:outline-none focus:shadow-outline">
        <Link to="/student/course" className=''>Go to My Course</Link>
                </Button>
</div>
  <div className='bg-gray-400 overflow-hidden rounded-3xl shadow-slate-950 shadow-2xl'>
    <img src={aaa} className=' w-100 w-[800px] bg-cover'/>
  </div>
</div>
            </div>
    </div>
  )
}

export default Hwd
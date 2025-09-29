import React,{useContext,useEffect} from 'react'
import { Button } from 'antd'
import { Context } from '../../context'
import { Link ,useNavigate} from 'react-router-dom'
import bdu from "../../asset/bdu.png"
const Hwd = () => {
  const navigate=useNavigate();
  //SESSION
  // const {
  //   state: { head },
  // } = useContext(Context);
  // useEffect(() => {
  //   if (head === null) navigate("/headlogin");
  //  }, [head]);
  return (
    <div>
      <div>
        <div className='flex justify-around items-center max-w-[1500px] mx-auto h-screen'>
          <div >
            <h1 className='text-black max-w-[900px] text-left'>Welcome to our Head home page</h1>
            <p className='max-w-[500px] '> Dear headers We would like to thank for, you are here to teach our students and manage teachers and courses</p> <Button variant="primary" type="submit" className="flex mt-4 items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-5 px-4 rounded focus:outline-none focus:shadow-outline">
              <Link to="/head/ce/news" className=''>News </Link>
            </Button>
          </div>
          <div className='bg-gray-400 overflow-hidden rounded-3xl shadow-slate-950 shadow-2xl'>
            <img src={bdu} className=' w-90 w-[600px] bg-cover' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hwd
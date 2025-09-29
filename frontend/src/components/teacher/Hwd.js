import React,{useContext,useEffect} from 'react'
import { Button } from 'antd'
import { Link ,useNavigate} from 'react-router-dom'
import { Context } from '../../context'
import bdu from "../../asset/bdu.png"
const Hwd = () => {
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
      <div>
        <div className='flex justify-around items-center max-w-[1500px] mx-auto h-screen'>
          <div >
            <h1 className='text-black max-w-[900px] text-left'>Welcome to our Teacher home page</h1>
            <p className='max-w-[500px] '> Dear teachers We would like to thank for, you are here to teach our  computer dept students</p> <Button variant="primary" type="submit" className="flex mt-4 items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-5 px-4 rounded focus:outline-none focus:shadow-outline">
              <Link to="/teacher/ce/news" className=''>News </Link>
            </Button>
          </div>
          <div className='bg-gray-400 overflow-hidden rounded-3xl shadow-slate-950 shadow-2xl'>
            <img src={bdu} className=' w-100 w-[600px] bg-cover' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hwd
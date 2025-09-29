import React ,{useEffect,useContext} from 'react'
import aaa from "../../asset/aaa.jpg"
import ccc from "../../asset/ccc.png";
import bdu from "../../asset/bdu.png";
import { Context } from '../../context';
import { Button } from 'antd';
import { Link ,useNavigate} from 'react-router-dom';
import Footer from '../home/Footer';
import TLoggedinNavbar from "./TLoggedinNavbar";
import Contact from '../home/Contact';
const THome = () => {
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
        <TLoggedinNavbar/>
<div className='flex justify-around items-center max-w-[1500px] mx-auto h-screen'>
<div >
<h1 className='text-black max-w-[900px] text-left'>Welcome to our Teacher home page</h1>
<p className='max-w-[500px] '> Dear teachers We would like to thank for, you are here to teach our both electrical and computer students </p>

</div>
  <div className='bg-gray-400 overflow-hidden rounded-3xl shadow-slate-950 shadow-2xl'>
    <img src={bdu} className=' w-90 w-[600px] bg-cover'/>
  </div>
</div>
      <Example/>
      <Contact/>
      <Footer />
    </div>
  )
}

export default THome;
const links = [
  { name: 'News ', href: '/teacher/ce/news' },
  { name: 'Class', href: '/teacher/ce/class' },
  { name: 'Course Resources', href: '/teacher/ce/materials' },
  { name: 'Chat With Others', href: '/teacher/ce/chat' },
]
const stats = [
  { name: 'Courses', value: '60+' },
  { name: 'Site colleagues', value: 'unlimited' },
  { name: 'Hours per day', value: '24' },

]

export  function Example() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <img
      src={ccc}
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
      />
      <div
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Teach with us</h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
           we are student instructors and we are her to teach and manage students in effecient and time consume way by using this priceless wep app LMS
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
            {links.map((link) => (
              <a key={link.name} href={link.href}>
                {link.name} <span aria-hidden="true">&rarr;</span>
              </a>
            ))}
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse">
                <dt className="text-base leading-7 text-gray-300">{stat.name}</dt>
                <dd className="text-2xl font-bold leading-9 tracking-tight text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

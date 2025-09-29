import React, { useState } from "react";
import "./App.css";
import { Toaster } from 'react-hot-toast'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Navbar from "./components/home/Navbar";

import { Provider } from "./context";

import { BrowserRouter as Router, } from "react-router-dom"
//home
import About from "./components/home/About";
import Services from "./components/home/Services";
import Contact from "./components/home/Contact";
import MainHome from "./components/home/MainHome";
import LoginChoice from "./components/home/LoginChoice";


//student component
import Department from "./components/student/Department"
import StudentIndex from "./components/student";
import Class from "./components/student/Class"
import StudentHome from "./components/student/StudentHome"
import Exam from "./components/student/Exam"

import StudentSignup from "./components/student/StudentSignup"
import StudentNavbar from "./components/student/StudentNavbar"
import CourseMaterial from "./components/student/CourseMaterial"
import StudentLogin from "./components/student/StudentLogin"
import StudentCourselistee from "./components/student/Ee/StudentCourselistee"

//admin
import AdminLogin from "./components/registrar/AdminLogin";
import StudentsList from "./components/registrar/StudentsList";
import Admin from "./components/registrar/AdminNavbar"
import TeachersList from "./components/registrar/TeachersList";

import Headlist from "./components/registrar/Headlist";
//head
import HeadLogin from "./components/depthead/HeadLogin";
import AddCourse from "./components/depthead/AddCourse";
import DeptHome from "./components/depthead/DeptHome"
import HeadSignup from "./components/depthead/HeadSignup";
import Newh from "./components/depthead/News";
import Newslisth from "./components/depthead/Newst";

//teacher component
import TeacherSignup from "./components/teacher/TeacherSignup";

import Text from "./components/teacher/Text";

import TeachersHome from "./components/teacher/TeachersHome";
import TeachersLogin from "./components/teacher/TeachersLogin";
import AdminSignup from "./components/registrar/AdminSignup";
import TClass from "./components/teacher/TClass";
import LiveChat from "./components/teacher/LiveChat";
import StudentLiveChat from "./components/student/StudentLiveChat";
import Addnewstudent from "./components/registrar/Addnewstudent";
import Addnewhead from "./components/registrar/Addnewhead";
import Addnewteacher from "./components/registrar/Addnewteacher";
import Addnewadmin from "./components/registrar/Addnewadmin";
import Adminlist from "./components/registrar/Adminlist";
import LoggedinNavbar from "./components/student/LoggedinNavbar";
import HomeL from "./components/student/logedinstudent/HomeL";
import Courselist from "./components/depthead/Courselist";
import CourselistStudent from "./components/student/CourselistStudent";
import Eefile from "./components/teacher/Eefile";
import Cmaterialee from "./components/student/Cmaterialee";

import Teacherhomeee from "./components/teacher/ee/Teacherhomeee";
import THome from "./components/teacher/THome";
import TDepartment from "./components/teacher/TDepartment";
import HDepartment from "./components/depthead/HDepartment";
import HeadHOMECE from "./components/depthead/HeadHOMECE";
import Depthomeee from "./components/depthead/ee/Dpthomeee";
import AddCourseee from "./components/depthead/ee/AddCourseee";
import CourselistEE from "./components/depthead/ee/CourselistEE";
import Studentcourselistee from "./components/student/StudentcourselistEE";
import CEmaterialforteacher from "./components/teacher/CEmaterialforteacher";

import AssignmentEe from "./components/teacher/ee/AssignmentEe";
import AssignmentCe from "./components/teacher/AssignmentCe";
import EEassStud from "./components/student/Ee/EEassStud";
import CEassStud from "./components/student/CEassStud";
import LiveChatEE from "./components/teacher/ee/LiveChatEE";
import StudentLiveChatEE from "./components/student/Ee/StudentLiveChatEE";
import CEmaterialforteacherEE from "./components/teacher/ee/CEmaterialforteacherEE";
import SubmitAss from "./components/student/SubmitAss";
import SubmitAssEE from "./components/student/Ee/SubmitAssEE";

import ClassEe from "./components/student/Ee/ClassEe";
import TClassEe from "./components/teacher/ee/TClassEe";

import NewsPageTCE from "./components/teacher/Newst";
import AddNewsTCE from "./components/teacher/News";
import NewsPageTEE from "./components/teacher/ee/Newst";
import AddNewsADMIN from "./components/registrar/News";
import NewsPageADMIN from "./components/registrar/Newst"
import NewsPageSEE from "./components/student/Ee/Newst";
import NewsPageSCE from "./components/student/Newst";
import AddNewsTI from "./components/teacher/ee/News";

import LiveChatA from "./components/registrar/LiveChat";
import LiveChatdpee from "./components/depthead/ee/LiveChat";
import LiveChathdce from "./components/depthead/LiveChat";
import AdminHome from "./components/registrar/AdminHome";
// import EEstudentHome from "./components/student/Ee/EEstudentHome";
import UploadassResult from "./components/teacher/UploadassResult";
import AssResult from "./components/student/AssResult";
import UploadassResultEE from "./components/teacher/ee/UploadassResultEE";
import AssResultEE from "./components/student/Ee/AssResultEE";
import Addinf from "./components/depthead/ee/News";
import Addinfo from "./components/depthead/ee/thenew"
import Homei from "./components/student/Ee/Homei"


function App() {

  return (
    <Provider>

      <Toaster position="top-center" reverseOrder={false} />
      <ToastContainer position="top-center" />

      <Routes>

        {/*        
       
        <Route path="/loginchoice" element={<LoginChoice />} />
        <Route path="/student" element={<StudentIndex />} />
         */}
        {/* student */}

        <Route path="/" element={<Navbar />}>

          <Route index element={<MainHome />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="/studentsignup" element={<StudentSignup />} />
        <Route path="/studentlogin" element={<StudentLogin />} />
        <Route path="/student/ce/coursematerial" element={<CourseMaterial />} />
        <Route path="/student" element={<StudentHome />} />
        <Route path="/student/ce" element={<HomeL />} />
        <Route path="/student/ce/class" element={<Class />} />
        <Route path="/student/ee/class" element={<ClassEe />} />
        {/* <Route path="/exam" element={<Exam />} /> */}
        <Route path="/student/ce/submitassignment" element={<SubmitAss />} />
        <Route path="/student/ee/submitassignment" element={<SubmitAssEE />} />

        <Route path="/student/department" element={<Department />} />
        <Route path="/student/ce/chat" element={<StudentLiveChat />} />
        <Route path="/student/course" element={<CourselistStudent />} />


        <Route path="/student/ee/assignment" element={<EEassStud />} />
        <Route path="/student/ce/assignment" element={<CEassStud />} />
        <Route path="/student/ee/chat" element={<StudentLiveChatEE />} />
        <Route path="/student/ee" element={<Homei />} />
        <Route path="/student/ee/coursematerial" element={<Cmaterialee />} />
        <Route path="/student/ee/mycourse" element={<Studentcourselistee />} />
        {/* admin */}
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminsignup" element={<AdminSignup />} />
        <Route path="/admin/studentslist" element={<StudentsList />} />
        <Route path="/admin/teacherslist" element={<TeachersList />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/addnews" element={<AddNewsADMIN />} />
        <Route path="/admin/news" element={<NewsPageADMIN />} />

        <Route path="/admin/studentslist/addnewstudent" element={<Addnewstudent />} />
        <Route path="/admin/headlist" element={<Headlist />} />
        <Route path="/admin/headlist/addnewhead" element={<Addnewhead />} />
        <Route path="/admin/teacherslist/addnewteacher" element={<Addnewteacher />} />
        <Route path="/admin/adminlist" element={<Adminlist />} />
        <Route path="/admin/adminlist/addnewadmin" element={<Addnewadmin />} />
        <Route path="/admin/livechat/" element={<LiveChatA />} />


        {/* head */}
        <Route path="/headlogin" element={<HeadLogin />} />
        <Route path="/head/ce/addcourse" element={<AddCourse />} />
        <Route path="/head" element={<DeptHome />} />
        <Route path="/head/ce/courses" element={<Courselist />} />
        <Route path="/head/ee/courses" element={<CourselistEE />} />
        <Route path="/head/department" element={<HDepartment />} />
        <Route path="/head/ce" element={<HeadHOMECE />} />
        <Route path="/head/ee" element={<Depthomeee />} />
        <Route path="/head/ee/addcourse" element={<AddCourseee />} />
        <Route path="/head/ce/news" element={<Newslisth />} />
        <Route path="/head/ce/addnews" element={<Newh />} />

        <Route path="/head/ee/chat" element={<LiveChatdpee />} />
        <Route path="/head/ce/chat" element={<LiveChathdce />} />

        <Route path="/headsignup" element={<HeadSignup />} />
        {/* //teacher */}
        <Route path="/teacherssignup" element={<TeacherSignup />} />

        <Route path="/teacher/ce/addcoursematerial" element={<Text />} />

        <Route path="/teacher/ce" element={<TeachersHome />} />
        <Route path="/teacher/ee/addcoursematerial" element={<Eefile />} />
        <Route path="/teacher/ee/" element={<Teacherhomeee />} />
        <Route path="/teacher/" element={<THome />} />
        <Route path="/teacher/department" element={<TDepartment />} />
        <Route path="/teacher/ce/materials" element={<CEmaterialforteacher />} />
        <Route path="/teacher/ee/assignment" element={<AssignmentEe />} />
        <Route path="/teacher/ce/assignment" element={<AssignmentCe />} />
        <Route path="/teacher/ee/chat" element={<LiveChatEE />} />
        <Route path="/teacher/ee/materials" element={<CEmaterialforteacherEE />} />


        <Route path="/teacherslogin" element={<TeachersLogin />} />
        <Route path="/teacher/ce/class" element={<TClass />} />
        <Route path="/teacher/ee/class" element={<TClassEe />} />
        <Route path="/teacher/ce/chat" element={<LiveChat />} />
        <Route path="/teacher/ee/news" element={<NewsPageTEE />} />
        <Route path="/teacher/ce/addnews" element={<AddNewsTCE />} />
        <Route path="/teacher/ce/news" element={<NewsPageTCE />} />

        <Route path="/student/ee/news" element={<NewsPageSEE />} />
        <Route path="/student/ce/news" element={<NewsPageSCE />} />
        <Route path="/head/ee/addnews" element={<Addinfo />} />
        <Route path="/head/ee/news" element={<Addinf />} />
        <Route path="/teacher/ee/addnews" element={<AddNewsTI />} />

        {/* <Route path="/admin/news" element={<NewsPageADMIN />} /> */}

        <Route path="/teacher/ce/uploadassignmentresult" element={<UploadassResult />} />
        <Route path="/teacher/ee/uploadassignmentresult" element={<UploadassResultEE />} />
        <Route path="/student/ce/assignmentresult" element={<AssResult />} />
        <Route path="/student/ee/assignmentresult" element={<AssResultEE />} />



      </Routes>


    </Provider>
  );
}
export default App
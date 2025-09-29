import express from "express";

const router = express.Router();
//middlewares
import { requireSignin } from "../middlewares";
// import { asyncWrapper } from "../middlewares/asyncWrapper";

// controllers
import { studentregister,studentlist,stlogin,stlogout ,currentStudent,headsignup,getLinkc,
    headlogin,deletstudent,selectdepartment,headlist,deletehead,addnewlinkc,deletelinkc,
    teacherlist,deleteteacher,addadmin,adminlist,deleteadmin,adminlogin,deletecourse,
    teacherregister,teacherlogin,tlogout,addcourse,courselist,currentTeacher,alogout,hlogout,
     currentAdmin,currentHead,addnewlinki,getLinki,deletelinki, noteadd, noteview,
     deleten,deletecourseee
} from "../controllers/auth";
import { updateStudent,getsinglestudent, updateTeacher,getsingleteacher,updateAdmin,updateHead,} from "../controllers/update/studentUpdate";
//students
router.post("/studentsignup", studentregister);
router.post("/studentlogin", stlogin);
router.get("/studentlogout", stlogout);
router.get("/student", requireSignin,currentStudent);
router.post("/selectdepartment", selectdepartment);
router.put('/studentupdate/:id',updateStudent);
router.get('/getsinglestudent/:id',getsinglestudent);
//teachers
router.put('/teacherupdate/:id',updateTeacher);
router.get('/getsingleteacher/:id',getsingleteacher);
router.post("/teacherssignup", teacherregister);
router.post("/teacherslogin", teacherlogin);
router.get("/current-teacher", requireSignin, currentTeacher);
router.get("/current-head", requireSignin, currentHead);
router.get("/current-admin", requireSignin, currentAdmin);
router.post("/addnewlinkc", addnewlinkc);
router.get("/getlinkc",getLinkc);
router.delete('/deletelinkc/:id',deletelinkc );
router.post("/addnewlinki", addnewlinki);
router.get("/getlinki",getLinki);
router.delete('/deletelinki/:id',deletelinki );

router.get("/teacherslogout", tlogout);
router.get("/adminlogout", alogout);
router.get("/headlogout", hlogout);

// headd
router.post("/addcourse", addcourse);
router.post("/headsignup", headsignup);
router.post("/headlogin", headlogin);
router.post("/deletecourse",deletecourse);
router.post("/deletecourseee",deletecourseee);

router.get("/courselist",courselist);
router.put('/headupdate/:id',updateHead);
//admin

router.put('/adminupdate/:id',updateAdmin);
router.get("/studentlist", studentlist);
router.get("/teacherlist",teacherlist);
router.post("/deletstudent", deletstudent);
router.post("/deleteteacher", deleteteacher);
router.post("/deletehead",deletehead);
router.post("/deleteadmin",deleteadmin);
router.get("/headlist",headlist);
router.get("/adminlist",adminlist);
router.post("/addadmin", addadmin);
router.post("/adminlogin", adminlogin);



//note
router.post("/noteadd", noteadd);
router.get("/viewnews", noteview);
router.post("/deletenews" ,deleten);


module.exports = router;

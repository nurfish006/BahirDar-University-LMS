import jwt from "jsonwebtoken"
//models
import Student from "../models/student";
import Teacher from "../models/teacher";
import Cecourse from "../models/cecourse";
import Eecourse from "../models/eecourse";
import Head from "../models/head";
import Admin from "../models/admin";
import Linkc from "../models/linkc";
import Linki from "../models/linki";
import Note from "../models/Note";
import { hashPassword, comparePassword } from "../utils/auth";





export const studentregister = async (req, res) => {
  try {
    // console.log(req.body);
    const { fname, lname, email, password,gender,department,semister,year } = req.body;
    // validation
    if (!fname) return res.status(400).send("Name is required");
  
    
    let studentExist = await Student.findOne({ email }).exec();
    if (studentExist) return res.status(400).send("This Student is Already Registered");

    // hash password
    const hashedPassword = await hashPassword(password);

    // register
    const student = new Student({
      fname,
      lname,
      email,
      password: hashedPassword,
      gender,
      department,
      year,
      semister
    });
    await student.save();
    // console.log("saved user", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }


};
///////

export const selectdepartment =async(req, res) => {
  try{
  const selectedOption = req.body.selectedOption;

  // Submit the form data to the server

  // Navigate to a different page based on the selected option
  if (selectedOption === 'ce') {
    res.send({ url: '/student/ce' });
  } else if (selectedOption === 'ee') {
    res.send({ url: '/student/ee' });
    } else {
    res.status(400).send('Invalid option');
  }}
  catch (err){
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};
////////

// loginssss
export const stlogin = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    // check if our db has user with that email
    const student = await Student.findOne({ email }).exec();
    if (!student) return res.status(400).send("No student found");
    // check password
    const match = await comparePassword(password, student.password);
    if (!match) return res.status(400).send("Incorrect password");
    // create signed jwt
    const token = jwt.sign({ _id: student._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    // return user and token to client, exclude hashed password
    student.password = undefined;
    // send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      // secure: true, // only works on https
    });
    // send user as json response
    res.json(student);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

//studentlogout
export const stlogout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "Signned out successfully" });
  } catch (err) {
    console.log(err);
  }
};

///current user

export const currentStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.student._id).select("-password").exec();
    console.log("student", student);
    return res.json(student);
  } catch (err) {
    console.log(err);
  }
};
export const currentTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.teacher._id).select("-password").exec();
    console.log("CURRENT_USER", teacher);
    return res.json(teacher);
  } catch (err) {
    console.log(err);
  }
};
export const currentHead = async (req, res) => {
  try {
    const head = await Head.findById(req.head._id).select("-password").exec();
    console.log("CURRENT_USER", head);
    return res.json(head);
  } catch (err) {
    console.log(err);
  }
};
export const currentAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select("-password").exec();
    console.log("CURRENT_USER", admin);
    return res.json(admin);
  } catch (err) {
    console.log(err);
  }
};


//teachersignup
export const teacherregister = async (req, res) => {
  try {
    // console.log(req.body);
    const { fname, lname, email, password,gender,department,status,experience } = req.body;
    // validation
    if (!fname) return res.status(400).send("Name is required");
   
    let teacherExist = await Teacher.findOne({ email }).exec();
    if (teacherExist) return res.status(400).send("Email is taken");

    // hash password
    const hashedPassword = await hashPassword(password);
    // register
    const teacher = new Teacher({
      fname,
      lname,
      email,
      password: hashedPassword,
      gender,
      department,
      status,
      experience,
    });
    await teacher.save();
    // console.log("saved user", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};


//teachers login

export const teacherlogin = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    // check if our db has user with that email
    const teacher = await Teacher.findOne({ email }).exec();
    if (!teacher) return res.status(400).send("No teachers found");
    // check password
    const match = await comparePassword(password, teacher.password);
    if (!match) return res.status(400).send("Incorrect password");
    // create signed jwt
    const token = jwt.sign({ _id: teacher._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    // return user and token to client, exclude hashed password
    teacher.password = undefined;
    // send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      // secure: true, // only works on https
    });
    // send user as json response
    res.json(teacher);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

// teachers logout
export const tlogout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "Signned out successfully" });
  } catch (err) {
    console.log(err);
  }
};
///admin logout
export const alogout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "Signned out successfully" });
  } catch (err) {
    console.log(err);
  }
};

//head logout
export const hlogout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "Signned out successfully" });
  } catch (err) {
    console.log(err);
  }
};

//headdddd
//add course

export const addcourse = async (req, res) => {
  try {
    // console.log(req.body);
    const { cname, ccode, ccredit } = req.body;
    // validation
    if (!cname) return res.status(400).send(" course Name is required");
    if (!ccode) return res.status(400).send(" course code is required");
    if (!ccredit) return res.status(400).send(" course credit is required");

    let courseExist = await Cecourse.findOne({ cname }).exec();
    if (courseExist) return res.status(400).send("this course is already added");

    // adding course
    const course = new Cecourse({
      cname,
      ccode,
      ccredit,
    });
    await course.save();
    // console.log("saved user", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

// head signup

export const headsignup = async (req, res) => {
  try {
    // console.log(req.body);
    const { fname, lname, email, password,gender,department } = req.body;
    // validation
    if (!fname) return res.status(400).send("Name is required");
   
    let headExist = await Head.findOne({ email }).exec();
    if (headExist) return res.status(400).send("Email is taken");

    // hash password
    const hashedPassword = await hashPassword(password);
    // register
    const head = new Head({
      fname,
      lname,
      email,
      password: hashedPassword,
      gender,
      department,
     
    });
    await head.save();
    // console.log("saved user", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

//head  login

export const headlogin = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    // check if our db has user with that email
    const head = await Head.findOne({ email }).exec();
    if (!head) return res.status(400).send("No head found");
    // check password
    const match = await comparePassword(password, head.password);
    if (!match) return res.status(400).send("Incorrect password");
    // create signed jwt
    const token = jwt.sign({ _id: head._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    // return user and token to client, exclude hashed password
    head.password = undefined;
    // send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      // secure: true, // only works on https
    });
    // send user as json response
    res.json(head);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};
///admin login
export const adminlogin = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    // check if our db has user with that email
    const admin = await Admin.findOne({ email }).exec();
    if (!admin) return res.status(400).send("No admin found");
    // check password
    const match = await comparePassword(password, admin.password);
    if (!match) return res.status(400).send("Incorrect password");
    // create signed jwt
    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    // return user and token to client, exclude hashed password
    admin.password = undefined;
    // send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      // secure: true, // only works on https
    });
    // send user as json response
    res.json(admin);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

//admin
// export const studentlist = async (req, res) => {
//   // try {
//   //   const students = await Student.find({}) ;
//   //   res.send({ status: "ok",data: students});
//   // } catch (error) {
//   //   console.log(error);
// //  }
// try {
//   const students = await Student.find({});
//   res.status(200).send({
//     message: "Users fetched successfully",
//     success: true,
//     data: students,
//   });
// } catch (error) {
//   console.log(error);
//   res.status(500).send({
//     message: "Error in fetching  ",
//     success: false,
//     error,
//   });
// }
// }
export const addadmin = async (req, res) => {
  try {
    // console.log(req.body);
    const { fname, lname, email, password,gender } = req.body;
    // validation
    if (!fname) return res.status(400).send("Name is required");
  
    let adminExist = await Admin.findOne({ email }).exec();
    if (adminExist) return res.status(400).send("Email is taken");

    // hash password
    const hashedPassword = await hashPassword(password);
    // register
    const admin = new Admin({
      fname,
      lname,
      email,
      password: hashedPassword,
      gender,
      
     
    });
    await admin.save();
    // console.log("saved user", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

//admin list
export const adminlist = async (req, res) => {
  try {
    const admins = await Admin.find({}) ;
   res.send({ status: "ok",data: admins});
  } catch (error) {
    console.log(error);
 }};
//student list
export const studentlist = async (req, res) => {
   try {
     const students = await Student.find({}) ;
    res.send({ status: "ok",data: students});
   } catch (error) {
     console.log(error);
  }};
  //teacherlist
  export const teacherlist = async (req, res) => {
    try {
      const teachers = await Teacher.find({}) ;
     res.send({ status: "ok",data: teachers});
    } catch (error) {
      console.log(error);
   }};
   ////head list
   export const headlist = async (req, res) => {
    try {
      const heads = await Head.find({}) ;
     res.send({ status: "ok",data: heads});
    } catch (error) {
      console.log(error);
   }};
   //courselist
   export const courselist = async (req, res) => {
    try {
      const courses = await Cecourse.find({}) ;
     res.send({ status: "ok",data: courses});
    } catch (error) {
      console.log(error);
   }};
   //delete students
   export const deletstudent= async (req, res) => {
  const { studentid } = req.body;
  try {
    Student.deleteOne({ _id: studentid }, function (err, res) {
      console.log(err);
    });
    res.send({ status: "Ok", data: "student sucessfully Deleted" });
  } catch (error) {
    console.log(error);
  }
};

////delete heade
export const deletehead= async (req, res) => {
  const { headid } = req.body;
  try {
    Head.deleteOne({ _id: headid }, function (err, res) {
      console.log(err);
    });
    res.send({ status: "Ok", data: "Head sucessfully Deleted" });
  } catch (error) {
    console.log(error);
  }
};
///delete teacher
export const deleteteacher= async (req, res) => {
  const { teacherid } = req.body;
  try {
    Teacher.deleteOne({ _id: teacherid }, function (err, res) {
      console.log(err);
    });
    res.send({ status: "Ok", data: "Teacher sucessfully Deleted" });
  } catch (error) {
    console.log(error);
  }
};
//delete admin
export const deleteadmin= async (req, res) => {
  const { adminid } = req.body;
  try {
    Admin.deleteOne({ _id: adminid }, function (err, res) {
      console.log(err);
    });
    res.send({ status: "Ok", data: "Admin sucessfully Deleted" });
  } catch (error) {
    console.log(error);
  }
};
//delete course
export const deletecourse= async (req, res) => {
  const { courseid } = req.body;
  try {
    Cecourse.deleteOne({ _id: courseid }, function (err, res) {
      console.log(err);
    });
    res.send({ status: "Ok", data: "Course sucessfully Deleted" });
  } catch (error) {
    console.log(error);
  }
};
export const deletecourseee= async (req, res) => {
  const { courseid } = req.body;
  try {
    Eecourse.deleteOne({ _id: courseid }, function (err, res) {
      console.log(err);
    });
    res.send({ status: "Ok", data: "Course sucessfully Deleted" });
  } catch (error) {
    console.log(error);
  }
};

/////////////////////////////////////////////////////////////////////////////
// Create a new link ce
export const addnewlinkc = async (req, res) => {
  try {
    const { url, description } = req.body;
    const newLink = new Linkc({ url, description });
    await newLink.save();
    res.status(201).json(newLink);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all links ce
export const getLinkc = async (req, res) => {
  try {
    const links = await Linkc.find();
    res.json(links);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
// Delete a link by ID ce
export const deletelinkc = async (req, res) => {
  try {
    const deletedLink = await Linkc.findByIdAndDelete(req.params.id);
    if (!deletedLink) {
      return res.status(404).json({ message: 'Link not found' });
    }
    res.json(deletedLink);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
// Create a new link  ee
export const addnewlinki = async (req, res) => {
  try {
    const { url, description } = req.body;
    const newLink = new Linki({ url, description });
    await newLink.save();
    res.status(201).json(newLink);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all links ee
export const getLinki = async (req, res) => {
  try {
    const links = await Linki.find();
    res.json(links);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
// Delete a link by ID ee
export const deletelinki = async (req, res) => {
  try {
    const deletedLink = await Linki.findByIdAndDelete(req.params.id);
    if (!deletedLink) {
      return res.status(404).json({ message: 'Link not found' });
    }
    res.json(deletedLink);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};


////
//newaa
export const noteadd = async (req, res) => {
  try {
    // console.log(req.body);
    const { title, content, createdAt } = req.body;
    // validation
    if (!title) return res.status(400).send(" title is required");
    if (!content) return res.status(400).send(" write here");
    if (!createdAt) return res.status(400).send(" course credit is required");

    let noteExist = await Note.findOne({ title }).exec();
    if (noteExist) return res.status(400).send("this note is already added");

    // adding Note
    const note = new Note({
      title,
      content,
      createdAt,
    });
    await note.save();
    // console.log("saved user", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

 //newslist
 export const noteview = async (req, res) => {
  try {
    const news = await Note.find({}) ;
   res.send({ status: "ok",data: news});
  } catch (error) {
    console.log(error);
 }};

 //delete news
export const deleten= async (req, res) => {
  const { nid } = req.body;
  try {
    Note.deleteOne({ _id: nid }, function (err, res) {
      console.log(err);
    });
    res.send({ status: "Ok", data: "deleted" });
  } catch (error) {
    console.log(error);
  }
};


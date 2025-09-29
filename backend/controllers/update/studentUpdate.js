import Teacher from "../../models/teacher";
import Student from "../../models/student";
import Admin from "../../models/admin"
import Head from "../../models/head"
// Update user by ID
export const updateStudent= async (req, res) => {
    const { id } = req.params;
    const {  fname,
      lname,
      email,
      password,
      gender,
      year,
      department,
      semister } = req.body;
    
    try {
      const  student= await Student.findByIdAndUpdate(id, { 
        fname,
        lname,
        email,
        password,
        gender,
        year,
        department,
        semister }, { new: true });
      res.json(student);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  // Get a user by ID
export const getsinglestudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
// Update teacher by ID
export const updateTeacher= async (req, res) => {
  const { id } = req.params;
  const {  
    fname,
    lname,
    email,
    password,
    gender,
    department,
    experience,
    status,
   } = req.body;
  
  try {
    const  teacher= await Teacher.findByIdAndUpdate(id, { 
      fname,
      lname,
      email,
      password,
      gender,
      department,
      status,
      experience,
      }, { new: true });
    res.json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Get a user by ID
export const getsingleteacher = async (req, res) => {
try {
  const { id } = req.params;
  const teacher = await Teacher.findById(id);
  if (!teacher) {
    return res.status(404).json({ message: 'teacher not found' });
  }
  res.json(teacher);
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Server Error' });
}
};
// Update admin by ID
export const updateAdmin= async (req, res) => {
  const { id } = req.params;
  const {  fname,
    lname,
    email,
    password,
    gender,
   } = req.body;
  
  try {
    const  admin= await Admin.findByIdAndUpdate(id, { 
      fname,
      lname,
      email,
      password,
      gender,
      }, { new: true });
    res.json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Update head by ID
export const updateHead= async (req, res) => {
  const { id } = req.params;
  const {  fname,
    lname,
    email,
    password,
    gender,
    department,
   } = req.body;
  
  try {
    const  head= await Head.findByIdAndUpdate(id, { 
      fname,
      lname,
      email,
      password,
      gender,
      department,
      }, { new: true });
    res.json(head);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
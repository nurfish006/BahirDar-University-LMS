 import { useEffect, useState, useContext } from "react";
 import { Context } from "../../context";
 import axios from "axios";
 import { useNavigate } from "react-router-dom";

 const StudentIndex = () => {
   // state
   const [hidden, setHidden] = useState(true);
   const navigate=useNavigate();
//SESSION
   const {
     state: { student },
   } = useContext(Context);
  //  useEffect(() => {
  //    if (student === null) 
  //    navigate("/studentLogin");
  //   }, [student]);
   useEffect(() => {
     fetchStudent();
   }, []);

  const fetchStudent = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/student`);
      console.log(data);
      setHidden(false); 
    } catch (err) {
      console.log(err);
      setHidden(true);
    }
  };

  return (
    <>
      {!hidden && (
        <h1 className="jumbotron text-center square">
          <pre>{JSON.stringify(student, null, 4)}</pre>
        </h1>
      )}
    </>
  );
 };
 export default StudentIndex;

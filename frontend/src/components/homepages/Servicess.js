import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"

const Servicess = [
  
  {
    id: 1,
    
    name: " Course materials",
    meaning:
      "corse materials are available for learners corse materials are available for learners corse materials are available for learners corse materials are available for learners corse materials are available for learners corse materials are available for learners",
      action: (
        <Button className=" mt-5 px-4 py-2 font-semibold rounded-md text-white bg-blue-400 hover:bg-blue-600">
          <Link to="/studentlogin">Course Materials</Link>
        </Button>
      ),
  },
  {
    id: 2,
   
    name: "management of users",
    meaning:
      "the administratore manages accounts of users the administratore manages accounts of users the administratore manages accounts of usersthe administratore manages accounts of usersthe administratore manages accounts of users",

    action: (
      <Button className="mt-5 px-4 py-2 font-semibold rounded-md text-white bg-blue-400 hover:bg-blue-600">
        <Link to="/adminlogin">Manage Users</Link>
      </Button>
    ),
  },
  {
    id: 3,
    
    name: "communication between actors",
    meaning:
      "the actors with in the system can comunicate with each other using room id as asecret key the four actors can share information in the form of text and file format",
    action: (
      <Button className="mt-5 px-4 py-2 font-semibold rounded-md text-white bg-blue-400 hover:bg-blue-600">
        <Link to="/teacherslogin">Communication</Link>
      </Button>
    ),
  },
  {
    id: 4,
   
    name: "Chat with others ",
    meaning:
      "the head can creat courses and share and give them for the teacher as we know                                                                                            ",
    action: (
      <Button className="mt-5 px-4 py-2 font-semibold rounded-md text-white bg-blue-400 hover:bg-blue-600">
        <Link to="/headlogin">create course </Link>
      </Button>
    ),
  }
];

export default Servicess;

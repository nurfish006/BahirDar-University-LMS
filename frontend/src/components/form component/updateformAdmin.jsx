import { useState, useEffect, useContext } from "react";
import { Context } from "../../context";
import { Link, useNavigate } from "react-router-dom";
import { SyncOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import axios from "axios";
import Footer from "../home/Footer"
// import './StudentSignup.css';
const UpdateFormAdmin = ({ adminToBeUpdted,formpopup, setformpopup }) => {
    const {
        fname: ufname,
        lname: ulname,
        email: uemail,
        password: upassword,
        gender: ugender,
    } = adminToBeUpdted;
    const [fname, setFname] = useState(ufname);
    const [lname, setLname] = useState(ulname);
    const [email, setEmail] = useState(uemail);
    const [password, setPassword] = useState(upassword);
    const [loading, setLoading] = useState(false);
    const [gender, setGender] = useState(ugender)
   
    const [message, setMessage] = useState("")

    console.log(adminToBeUpdted, "////////////Admin to be updated")
    ///////////////geting Admin to be updated////////////////////
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!fname || !lname || !email || !password  || !gender ) {
            setMessage('Please fill in all the information');
            return;
        }
        if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            setMessage('Please enter a valid email address');
            return;
        }
        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/
        )) {
            setMessage("Password must:\n"
                + "• Contains at least 1 lowercase letter\n"
                + "• Contains at least 1 uppercase letter\n"
                + "• Contains at least 1 digit\n"
                + "• Contains at least 1 special character\n"
                + "• Is at least 8 characters long");
            return;
        }
        // console.table({ name, email, password });
        try {
            setLoading(true);
            const updatedUser = {
                fname,
                lname,
                email,
                password,
                gender,
               
            };
            // Make an HTTP request to update the user's information
            const res = await axios.put(`http://localhost:8000/api/adminupdate/${adminToBeUpdted._id}`, updatedUser);
            toast.success("Successesuly updated")
            setformpopup(!formpopup)
            console.log(res.data, "//////////updated data");
            setLoading(false);
// navigate("/admin/adminlist")
        } catch (err) {
            console.log(err);
            toast.error("canot update user")
        }
    };
    return (
        <>
            <div className="select mt-6 ">
                <form className="mx-auto bg-gray-200 max-w-sm rounded-lg flex flex-col p-7 " onSubmit={handleSubmit}>
                    <p className="mx-auto text-xl">Update</p>
                    <label>First Name</label>
                    <input
                        type="text"
                        className="border-2 rounded-md "
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                        placeholder="Enter first name"
                        required
                    />
                    <label>Last Name</label>
                    <input
                        type="text"
                        className="border-2 rounded-md"
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                        placeholder="Enter last name"
                        required
                    />
                    <label> Email</label>
                    <input
                        type="email"
                        className="border-2 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        required
                    />
                    <label className=""> Password</label>
                    <input
                        type="password"
                        className="border-2 rounded-md"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                    />
                    <p className="border-2 rounded-md">
                        Gender :
                        <label className="ml-3"> male
                            <input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={(e) => setGender('male')} />
                        </label><br />
                        <label className="ml-20"> female
                            <input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={(e) => setGender('female')} />
                        </label>
                    </p>

                    <div className="flex gap-5">
<button type="submit" className="bg-blue-500 rounded-md w-1/2 mx-auto mt-7"
                        disabled={!fname || !lname || !email || !password || loading}>

                        {loading ? <SyncOutlined spin /> : "Update"}
                    </button>
    <button onClick={()=>setformpopup(!formpopup)} className="bg-red-500 rounded-md w-1/2 mx-auto mt-7">Cancel</button>
</div>

                    <div className=" text-red-500"> {message && <div>{message}</div>}</div>
                </form>
            </div>

        </>
    );
};

export default UpdateFormAdmin;

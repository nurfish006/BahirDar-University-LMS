import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
    const history = useNavigate();
    const [email, setEmail] = useState('')
    const [id, setId] = useState('')

    async function submit(e) {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/login", {
                email, id
            }) 
                .then(res => {
                    if (res.data == "exist") {
                        history("home", { state: { id: email } })
                    }
                    else if (res.data == "notexist") {
                        alert("the user is not signed up")
                    }
                })
                .catch(e => {
                    alert("incorrect information inserted")
                    console.log(e);
                })

        }
        catch (e) {
            console.log(e);

        }
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <form action="POST">
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" name="" id="" />
                <input type="password" onChange={(e) => { setId(e.target.value) }} placeholder="id" name="" id="" />
                <input type="submit" onClick={submit} />
            </form>
            <br />
           Already registered? <a href="/login">Login</a>
            

        </div>
    )
}

export default Signup
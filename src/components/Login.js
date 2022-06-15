import React, { useState, useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'

function Login({show_Alert}) {

    let navigate = useNavigate();

    useEffect(()=>{
        localStorage.clear();
        navigate("/login")
    },[])

    const [credentials, setcredentials] = useState({
        "email": "",
        "password": ""
    })

    const Onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const Handlesubmit = async (e) => {
        e.preventDefault();
        // console.log(credentials)

        const { email,password } = credentials
        const host = "http://localhost:5000";
        const res = await fetch(`${host}/api/auth/authenticate_user`,
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body:JSON.stringify({ email,password })
            })
        const Json = await res.json();

        // console.log(Json)

        if(Json.status){
            navigate("/")
            localStorage.setItem('token',Json.token)
            show_Alert(Json.msg,'success')
        }
        else{
            show_Alert(Json.msg,'danger')
        }

    }
    return (
        <>
            <div className="Box">
                <div className="Box_box">
                    <h6 style={{ color: "#12c512" }} className='text-center'>MERN and React assignment with Login and sign-up.</h6>
                    <p className='text-center'>Login to access the form and clients name</p>
                    <Link style={{ "display": "block" }} className='text-center signup_btn' to="/Signup">Signup</Link>
                    <form className='accout_form my-3' onSubmit={Handlesubmit}>
                        <div className="form-group">
                            <label className='my-2' htmlFor="email"><i className="fa-solid fa-envelope mx-1"></i>Email address</label>
                            <input required value={credentials.email} onChange={Onchange} autoComplete='false' type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                            <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label className='my-2' htmlFor="password"><i className="fa-solid fa-key mx-1"></i>Password</label>
                            <input required value={credentials.password} onChange={Onchange} autoComplete='false' type="password" name='password' className="form-control" id="password" placeholder="Password" />
                        </div>
                        <div className="login_btn">
                            <button type="submit" className="btn btn-primary my-3">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;

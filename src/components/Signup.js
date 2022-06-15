import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

function Signup(props) {

    const [credentials, setCredentails] = useState({
        name1: "",
        email: "",
        password: "",
        cpassword: ""

    })
    let navigate = useNavigate();
    const host = "http://localhost:5000"
    const Onchange = (e) => {
        setCredentails({ ...credentials, [e.target.name]: e.target.value })
    }
    const Handlesubmit = async (e) => {
        e.preventDefault();

        const { name1, email, password, cpassword } = credentials

        if (password !== cpassword) {
           props.show_Alert("Password and confirm password must match..","danger")
        }


    }
    return (
        <>
            <div className="Box">
                <div className="Box_box">
               
                <h6 style={{ color: "#12c512" }} className='text-center'>MERN and React assignment with Login and sign-up.</h6>
                    <p className='text-center'>Login to access the form and clients name</p>
                    <Link style={{ "display": "block" }} className='text-center signup_btn' to="/Login">Login</Link>
                    <form className='accout_form my-3' onSubmit={Handlesubmit}>
                        <div className="form-group">
                            <label className='my-2' htmlFor="exampleInputEmail1"><i className="fa-solid fa-user mx-1"></i>Full Name</label>
                            <input minLength={3} required value={credentials.name1} onChange={Onchange} autoComplete='false' type="text" className="form-control" id="name" name='name1' aria-describedby="emailHelp" placeholder="Enter name..." />
                        </div>
                        <div className="form-group">
                            <label className='my-2' htmlFor="exampleInputPassword1"><i className="fa-solid fa-envelope mx-1"></i>Email</label>
                            <input required value={credentials.email} onChange={Onchange} autoComplete='false' type="email" className="form-control" name='email' id="email" placeholder="Email..." />
                        </div>
                        <div className="form-group">
                            <label className='my-2' htmlFor="exampleInputPassword1"><i className="fa-solid fa-key mx-1"></i>Password</label>
                            <input  required value={credentials.password} onChange={Onchange} autoComplete='false' type="text" name='password' className="form-control" id="password" placeholder="Password..." />
                        </div>
                        <div className="form-group">
                            <label className='my-2' htmlFor="exampleInputPassword1"><i className="fa-solid fa-key mx-1"></i>Confirm Password</label>
                            <input value={credentials.cpassword} onChange={Onchange} required autoComplete='false' type="password" name='cpassword' className="form-control" id="cpassowrd" placeholder="Confirm Password..." />
                        </div>
                        <div className="login_btn">
                            <button type="submit" className="btn btn-primary my-3">Sign-Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup

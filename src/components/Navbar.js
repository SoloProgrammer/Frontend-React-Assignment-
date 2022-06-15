import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
// import noteContext from '../context/notes/noteContext';


function Navbar(props) {

  const loaction = useLocation();
  const navigate = useNavigate();

  const handlelogout = () => {
    localStorage.removeItem("token")
    navigate("/Login")
  }
  const click1 = (msg) => {
    props.show_Alert(msg, "danger");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
       
        <Link className="navbar-brand" to="/">React Assignment</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {<Link onClick={() => { !localStorage.getItem("token") && click1("Login First") }} className={`nav-link ${loaction.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>}
            </li>
            {localStorage.getItem('token') && <li className="nav-item">
              <Link className={`nav-link ${loaction.pathname === "/clientlist" ? "active" : ""}`} to="/clientlist">ClientList</Link>
            </li>}
            {localStorage.getItem('token') && <li className="nav-item">
              <Link onClick={() => { !localStorage.getItem("token") && click1("Login First to acesss inotebook Blogs") }} className={`nav-link ${loaction.pathname === "/form" ? "active" : ""}`} to="/form">Form</Link>
            </li>}

          </ul>

          {!localStorage.getItem("token") ? <form className="d-flex">
            <Link className="btn btn-outline-primary  mx-2" to="/login">Login</Link>
            <Link className=" btn btn-outline-primary" to="/Signup">Sign-up</Link>
          </form> : <button onClick={handlelogout} className=" btn btn-outline-primary" >Logout</button>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

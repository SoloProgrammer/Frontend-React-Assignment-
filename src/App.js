// import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';

import { useState } from 'react';
import Home from './components/Home';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Clients from './components/Clients';
import Form from './components/Form';

function App() {

  const [alert,setAlert] = useState(null)

  const show_Alert = (message,type) =>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null)
    }, 3000);
  }

  return (
    <>
      <BrowserRouter>
      <Navbar show_Alert={show_Alert}/>
      <Alert alert={alert}/>
        <div className="container">
          <Routes>
           { localStorage.getItem("token") ? <Route  exact path="/" element={<Home show_Alert={show_Alert}/>}/>
                    : <Route exact path="/" element={ <Login show_Alert={show_Alert} />}/>}
            <Route exact path="/Login" element={<Login show_Alert={show_Alert}/>} />
            <Route exact path="/Signup" element={<Signup />} />
            <Route exact path="/clientlist" element={<Clients/>} />
            <Route exact path="/form" element={<Form show_Alert={show_Alert}/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
   
  );
}

export default App;

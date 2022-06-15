import React,{useEffect,useState} from 'react'

// import loader from '../loader/loader.gif'

import '../CSS/home.css'

function Home() {

  const[user,setUser] = useState('')
  // const[Loading,setloading] = useState(true)

  const getuser = async ()=>{
    const res = await fetch("http://localhost:5000/api/auth/getuser",
    {
      method:"GET",
      headers:{
        "auth-token":localStorage.getItem('token')
      }
    })

    const json = await  res.json();

    // console.log(json.name1)
    setUser(json.name1)
    // setloading(false)

  }

  useEffect(()=>{
    getuser();
  },[])
  return (

    <div className="Homebox">
      <div className='container Home'>
      {/* {Loading && <img  style={{"width":"4rem","height":"4rem"}} src={loader} className="loader" alt="" />} */}
        <h1><span className='wel'>Welcome</span>  {user}</h1>
        <h3>We are MERN develpers</h3>
      <div className="img">
        <img src="https://codingthesmartway.com/wp-content/uploads/2019/01/mern_logo-768x560.png" alt="mern"/>
      </div>
      </div>
    </div>
  )
}

export default Home

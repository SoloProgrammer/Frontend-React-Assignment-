import React, { useEffect, useState } from 'react'

function Form({ show_Alert }) {

  const [formdetail, setFormdetail] = useState({
    "status":"unfilled",
  })

  const [save, setSave] = useState(false)

  const [credentials, setCredentials] = useState({
    "comp_name": "8848 Digital LLP",
    "Fname": "",
    "email": "",
    "gender": "",
    "address": "",
    "phone": "",
    "bank": "HDFC",
    "c_type": "",
    "territory": "East"

  })

  const getformdata = async () => {
    const res = await fetch("http://localhost:5000/api/form/getformdata",
      {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token")
        }
      }
    )

    const json = await res.json();

    // console.log(json)

    setFormdetail({...formdetail,
      "Status": json.status,
      "msg": json.msg
    })

    if (json.status === "filled") {
      setSave("saved")
      setCredentials(json.formdata);
      // console.log(credentials)
    }

  }


  useEffect(() => {
    getformdata();
  }, [])

  const saveformdata = async () => {


    if (formdetail.Status === "unfilled") {
      const res = await fetch("http://localhost:5000/api/form/addformdata", {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...credentials })
      })

      getformdata();

    }
    else{
      const {comp_name,Fname,email,gender,address,phone,bank,c_type,territory} = credentials
      // console.log(credentials._id)
      const res = await fetch(`http://localhost:5000/api/form/updateformdata/${credentials._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ comp_name,Fname,email,gender,address,phone,bank,c_type,territory })
      })

      // const json = await res.json();
      // console.log(json)
      getformdata();

    }

    setTimeout(() => {
      setSave(false)
      setSave("saved")
    }, 1000);
    // getformdata();
  }


  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
    setFormdetail({...formdetail,"status":"unfilled"})
    if(save === false){
     return setSave(false)
    }
    setSave("update")
  }
  const Handlesubmit = (e) => {
    e.preventDefault();
    if (credentials.phone.length < 10) {
      show_Alert("phone is not valid", "info")
      return
    }
    setSave(true)
    saveformdata();
    // console.log(credentials)
  }
  return (
    <>
      {save === "saved" && <p className='detail' >If you want to update form data you can just make changes in the form and  the saved button will automatically change to Savechanges button when you clicked ,it will automatically update the form data in the cloud </p>}
      {save === "update" && <p className='detail txt-blue-500' >Save the Changes in cloud the on clicking the save changes Button <i className="mx-2 fa-solid fa-hand-point-right"></i></p>}
      <h3 className='msg my-1'>{formdetail.msg}</h3>
      <div className="container my-1 shadow_con">
        <div className="formbox">
          <form onSubmit={Handlesubmit} >
            <div className="mainforms">
              <div className="rightform form">
                <div className="inpt">
                  <label htmlFor="comp_name">Represents Company</label>
                  <select value={credentials.comp_name} name='comp_name' onChange={onchange} className="form-select" aria-label="Default select example">
                    <option value="The Lawn Guru" >The Lawn Guru</option>
                    <option value="8848 Digital LLP">8848 Digital LLP</option>
                    <option value="showbiz pizza palace">showbiz pizza palace</option>
                    <option value="Wayne Enterprises">Wayne Enterprises</option>
                    <option value="Progarden mangement">Progarden mangement</option>
                  </select>
                </div>
                <div className="inpt">
                  <label htmlFor="Fname">Full Name</label>
                  <input value={credentials.Fname} onChange={onchange} required type="text" name="Fname" id="Fname" />
                </div>
                <div className="inpt">
                  <label htmlFor="email">Email</label>
                  <input value={credentials.email} required type="email" onChange={onchange} name="email" id="email" />
                </div>
                <div className="radio my-2">
                  <p>Select Gender</p>
                  <div className="radio1">
                    <label htmlFor="male" className='mx-2'>Male</label>
                    <input
                      required
                      checked={credentials.gender === 'male'}
                      className='my-2'
                      id='male'
                      type="radio"
                      value="male"
                      name='gender'
                      // checked={gender === 'male'}
                      onChange={onchange}
                    />
                  </div>
                  <div className="radio1">
                    <label htmlFor="female" className='mx-2'>Female</label>
                    <input
                      required
                      className='my-2'
                      id='female'
                      name='gender'
                      type="radio"
                      value="female"
                      checked={credentials.gender === 'female'}
                      // checked={gender === 'male'}
                      onChange={onchange}
                    />
                  </div>
                  <div className="radio1">
                    <label htmlFor="other" className='mx-2'>Others</label>
                    <input
                      checked={credentials.gender === 'other'}
                      className='my-2'
                      required
                      id='other'
                      name='gender'
                      type="radio"
                      value="other"
                      // checked={gender === 'male'}
                      onChange={onchange}
                    />
                  </div>
                </div>
              </div>
              <div className="leftform form">
                <div className="inpt">
                  <label htmlFor="phone">Phone</label>
                  <input value={credentials.phone} onChange={onchange} type="phone" name="phone" id="phone" />
                </div>
                <div className="inpt">
                  <label htmlFor="comp_name">Select Bank</label>
                  <select value={credentials.bank} name='bank' onChange={onchange} className="form-select" aria-label="Default select example">
                    <option value="Goldman sachs" >Goldman sachs</option>
                    <option value="City Group Inc">City Group Inc</option>
                    <option value="Wells Fargo">Wells Fargo</option>
                    <option value="Bank pf America">Bank pf America</option>
                    <option value="HDFC">HDFC</option>
                  </select>
                </div>
                <div className="radio my-2">
                  <p>Customer Type</p>
                  <div className="radio1">
                    <label htmlFor="individual" className='mx-2'>Individual</label>
                    <input
                      required
                      checked={credentials.c_type === 'Individual'}
                      className='my-2'
                      id='individual'
                      type="radio"
                      value="Individual"
                      name='c_type'
                      // checked={gender === 'male'}
                      onChange={onchange}
                    />
                  </div>
                  <div className="radio1">
                    <label htmlFor="Company" className='mx-2'>Company</label>
                    <input
                      required
                      className='my-2'
                      id='Company'
                      name='c_type'
                      type="radio"
                      value="Company"
                      checked={credentials.c_type === 'Company'}
                      // checked={gender === 'male'}
                      onChange={onchange}
                    />
                  </div>
                </div>
                <div className="inpt">
                  <label htmlFor="territory">Select Territory</label>
                  <select value={credentials.territory} name='territory' onChange={onchange} className="form-select" aria-label="Default select example">
                    <option value="East" >East</option>
                    <option value="West">West</option>
                    <option value="North">North</option>
                    <option value="South">South</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="inpt add">
              <label htmlFor="Address">Address</label>
              <textarea value={credentials.address} onChange={onchange} name="address" id="Address" cols="20" rows="3"></textarea>
            </div>
            <button disabled={save === "saved" ? true : false} className='save_btn' type='submit'>
              <i className={`mx-2 fa-solid ${save === "saved" ? "fa-circle-check" : "fa-cloud-arrow-up"} `}></i>
              {save === true && "Saving..."}
              {save === "saved" && "Saved"}
              {!save && "Save"}
              {save === "update" && "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Form

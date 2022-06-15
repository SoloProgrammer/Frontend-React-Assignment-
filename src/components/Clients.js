import React, { useEffect, useState } from 'react'

import loader from '../loader/loader.gif'


function Clients() {

    const [clients, setClients] = useState([])
    const[Loading,setloading] = useState(true)

    const getallclients = async () => {
        let res = await fetch("http://work.8848digitalerp.com/api/resource/Client",
            {
                method: 'GET',
                headers:
                {
                    "Authorization": "token 6de39bbdb1da4ec:40d5ae49cdd75bc"
                }

            });

        const json = await res.json();

        // console.log(json.data)
        setClients(json.data)
        setloading(false)

    }

    useEffect(() => {
        getallclients();
    }, [])
    return (
        <>
            <div className="container my-3 cl_con">
                <h1>Here are all Clients /.</h1>
                {Loading && <img  style={{"width":"4rem","height":"4rem"}} src={loader} className="loader" alt="" />}
                <div className="clientsbox">
                    {
                        clients.map((client, index) => {
                            return <div key={index} className="clientsname">
                                <img src="https://th.bing.com/th/id/OIP.M6Cl4s5YCn8siPzP1rXciQAAAA?pid=ImgDet&rs=1" alt="" />
                                <p>{client.name}</p>
                            </div>
                        })
                    }

                </div>

            </div>

        </>
    )
}

export default Clients

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { data } from '../../dummyData'
import './Home.css'

function Home() {
    const [state, setState] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        var token = localStorage.getItem("token")
        axios.get(`http://localhost:8000/user-profile`, {
            headers: {
                "Authorization": `Barer ${token}`
            }
        }).then((res) => {
            setState(res.data.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const logout = () => {
        const token = localStorage.getItem('token')
        if (token) {
            axios.delete(`http://localhost:8000/logout`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(() => {
                    localStorage.removeItem('token')
                    setState(null)
                    navigate('/')
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    return (
        <>

            <nav className="d-flex justify-content-end m-5">
                <span><h4 className='mt-1 mr-3'>Hi, {state}</h4></span>
                <button onClick={logout} className="button p-2" style={{ width: "90px", height: "40px" }}><p>Logout</p></button>
            </nav>
            <div className='container-fluid'>

                <div className='d-flex flex-column align-items-center m-1 text-muted' style={{ gap: "20px" }}>
                    <h5>Name of your Organization</h5>
                    <input
                        type="text"
                        className="form-control"
                        style={{
                            width: "30%",
                            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                            borderRadius: "5px",
                            height: "50px",
                            textAlign: "center"
                        }}
                        placeholder="Enter organization name"
                        name="text"
                        text-muted
                    />
                    <h5>Select Your Organization Type below</h5>
                </div>

                <div className='container overflow-auto' style={{ height: "350px", width: "55%" }}>

                    <div className="d-flex flex-wrap justify-content-center align-items-center mt-2" style={{ gap: "50px" }}>
                        {data?.map((data, index) => (
                            <div className="card" key={index} style={{ width: "10rem", height: "130px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", borderRadius: "5px" }}>
                                <div className="card-content d-flex flex-column justify-content-center align-items-center pt-4">
                                    <img src={data.pic} alt="img" width="60px" height="50px" style={{ color: "blue" }} />
                                    <h6 className='text-muted mt-3'>{data.name}</h6>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-2">
                    <button type="button" className="button" style={{ width: "100px", height: "40px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", borderRadius: "5px" }}>Next</button>
                </div>
            </div>

        </>
    )
}

export default Home
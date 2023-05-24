import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function LogIn() {
  const navigate = useNavigate();
  const [state, setState] = useState({ username: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const submitButton = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8000/log-in', state)
      .then((res) => {
        const { token, success } = res.data;
        localStorage.setItem('token', token);
        if (success) {
          navigate('/home');
        }
      })
      .catch((err) => {
        if (err.response) {
          alert(err.response.data.message);
        } else {
          alert('An error occurred. Please try again.');
        }
      });
  };

    return (
        <>

            <nav className="d-flex justify-content-end m-4">
                <span className='m-2 text-muted'><b><p>Don't have an account?</p></b></span>
                <a href="/sign-up"><button className="button p-2" style={{ width: "90px", height: "40px" }}><p>Sign Up</p></button></a>
            </nav>
            <div className='background-half-circle'> </div>

            <section className="section d-flex align-items-center " style={{ marginTop: "50px" }}>
                <div className="container-fluid p-5">
                    <div className="row justify-content-center bg-hidden">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-4">
                            <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
                                <div className="card-body p-5">
                                    <h4 className="login-head text-center mb-4 text-muted">Welcome back!</h4>

                                    <div className="form-outline mb-4">
                                        <label className="form-label text-left text-muted" htmlFor="email">
                                            <h6>Email</h6>
                                        </label>
                                        <input
                                            type="email" className="form-control form-control-lg shadow" name="email" placeholder='Email address'
                                            onChange={handleInputChange} required
                                        />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className="form-label text-left text-muted" htmlFor="password">
                                            <h6>Password</h6>
                                        </label>
                                        <input
                                            type="password" className="form-control form-control-lg shadow" name="password" placeholder='Password'
                                            onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-check mb-1">
                                        <input type="checkbox" className="form-check-input" id="rememberMe" />
                                        <label className="form-check-label text-muted" htmlFor="rememberMe"><b><p>Remember Me</p></b></label>
                                    </div>
                                    <button className="button" type="submit" onClick={submitButton}
                                        style={{ width: "100%", height: "50px" }}>
                                        <h6>Login</h6>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}

export default LogIn
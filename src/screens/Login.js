import React, { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [cred, setCred] = useState({ email: "", password: "" });
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify({
        email: cred.email,
        password: cred.password
      })
    })

    const jsn = await res.json();
    console.log(jsn);

    if (!jsn.success) {
      alert("enter valid credentials");
    }
    if (jsn.success) {
      navigate("/")
    }


  }

  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name="email" value={cred.email} id="exampleInputEmail1" onChange={onChange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password1" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={cred.password} id="exampleInputPassword1" onChange={onChange} />
          </div>

          <button type="submit" className=" m-3 btn btn-success">Submit</button>
          <Link to="/createuser" className="m-3 btn btn-danger" >Not a user</Link>
        </form>
      </div>
    </>
  )
}



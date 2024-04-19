import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {

    const [cred, setCred] = useState({name:"", email:"", password:"", geolocation:""});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({name: cred.name,
            email: cred.email,
            location: cred.geolocation,
            password: cred.password
            })
        })
        
        const jsn = await res.json();
        console.log(jsn);

        if(!jsn.success){
            alert("enter valid credentials");
        }
        navigate("/")
    }

    const onChange = (e) => {
        setCred({...cred, [e.target.name]: e.target.value })
    }
  return (
    <>
    <div className='container'>
        <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name </label>
    <input type="text" className="form-control" name="name" value={cred.name} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" name="email" value={cred.email} id="exampleInputEmail1" onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password1" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" value={cred.password} id="exampleInputPassword1" onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="geolocation" className="form-label">Address</label>
    <input type="text" className="form-control" name="geolocation" value={cred.geolocation} id="exampleInputPassword1" onChange={onChange}/>
  </div>
  <button type="submit" className=" m-3 btn btn-success">Submit</button>
  <Link to="/login" className="m-3 btn btn-danger" >Already a user</Link>
</form>
</div>
    </>
  )
}

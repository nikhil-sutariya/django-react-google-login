import React, { useState } from 'react'
import { apiCall } from '../_apiConfig/Apicall';
import { useNavigate } from "react-router-dom";

export const Signup = () => {

  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {    
      e.preventDefault()
      const header = new Headers()
      header.append('Content-Type', 'application/json')

      const response = await apiCall(
        'accounts-api/register/',
        'POST',
        header,
        JSON.stringify({
          first_name : fname,
          last_name : lname,
          phone : phone,
          email : email,
          password : password,
          password2 : password2,
        }),
      )
      if (response.status === 201) {
        alert('Signup complete')
        navigate('/')
      }
  }

  return (
    <div className='container mt-3'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">First name</label>
          <input type="text" className="form-control w-25" id="first_name" name='first_name' onChange={(e) => setFname(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">Last name</label>
          <input type="text" className="form-control w-25" id="last_name" name='last_name' onChange={(e) => setLname(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone number</label>
          <input type="text" className="form-control w-25" id="phone" name='phone' onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control w-25" id="email" name='email' onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control w-25" id="password" name='password' onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="password1" className="form-label">Confirm password</label>
          <input type="password" className="form-control w-25" id="password1" name='password2' onChange={(e) => setPassword2(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

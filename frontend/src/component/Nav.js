import React from 'react'
import { Link, NavLink } from "react-router-dom";
import useAuth from '../useAuth';
import { apiCall } from '../_apiConfig/Apicall';

export const Nav = () => {
  const { logout, userDetails } = useAuth()
  const user = userDetails()

  const handleLogout = async () => {
    const header = new Headers()
    header.append('Content-Type', 'application/json')
    header.append('Authorization', 'Bearer ' + user.accessToken)

    const response = await apiCall(
      'accounts-api/logout/',
      'POST',
      header,
      JSON.stringify({
        refresh: user.refreshToken,
      }),
    )

    if (response.status === 200) {
      logout()
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Google Ads</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink activeClassName='active' className="nav-link" to="/">Home</NavLink>
                {/* <Link className="nav-link" to="/">Home</Link> */}
              </li>
              <li className="nav-item">
                <NavLink activeClassName='active' className="nav-link" to="/about">About</NavLink>
                {/* <Link className="nav-link" to="/about">About</Link> */}
              </li>
              {user ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={handleLogout}>Logout</Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink activeClassName='active' className="nav-link" to="/login">Login</NavLink>
                    {/* <Link className="nav-link" to="/login">Login</Link> */}
                  </li>
                  <li className="nav-item">
                    <NavLink activeClassName='active' className="nav-link" to="/signup">Signup</NavLink>
                    {/* <Link className="nav-link" to="/signup">Signup</Link> */}
                  </li>
                </>
              )
              }
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

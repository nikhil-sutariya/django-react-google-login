import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../useAuth";
// import { useAuth } from '../useAuth'
import { apiCall } from "../_apiConfig/Apicall";
import GoogleLogin from "react-google-login";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { login } = useAuth();

  if (localStorage.getItem("user")) {
    navigate("/");
  }

  const responseGoogle = (response) => {
    console.log(response);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const header = new Headers();
    header.append("Content-Type", "application/json");

    const response = await apiCall(
      "auth/token/",
      "POST",
      header,
      JSON.stringify({
        username: email,
        password: password,
        grant_type: "password",
        client_id: "DSlvaPCWZTjhisdmBbusOY5KKjJi3pibIq5ywHKw",
        client_secret:
          "qsVtHQ8Ypt6w0NyuxWVjMBbHgoXAha1qcJ1jPnch67J4UxtxPqwRdXG6hDTsC3yBXX6TQMNP8lVGlioVJAegqCXxqBIKEGPNo1eoJIkTvI7tN2CTRzkagt3yXtae4HR7",
      })
    );
    const jsonobj = await response.json();
    console.log(jsonobj);

    if (response.status === 200) {
      let details = {
        userId: jsonobj.userId,
        firstName: jsonobj.firstName,
        lastName: jsonobj.lastName,
        email: jsonobj.email,
        accessToken: jsonobj.access_token,
        refreshToken: jsonobj.refresh_token,
      };
      login(details);
      navigate("/");
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control w-25"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control w-25"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <GoogleLogin
        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../gqloptions/mutations";
import { useMutation } from "@apollo/client";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [signinUser, { loading, error, data }] = useMutation(LOGIN_USER, {
    onCompleted(data) {
      localStorage.setItem("token", data.user.token);
      navigate("/");
    },
  });

  if (loading) return <h1>Loading....</h1>;
  // if (data) {
  //   localStorage.setItem("token", data.user.token);
  //   navigate("/");
  // }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signinUser({
      variables: {
        userSignin: formData,
      },
    });
  };

  return (
    <div className="container my-container">
      {error && <div className="red card-panel">{error.message}</div>}
      <h5>Login!!</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />
        <Link to="/signup">
          <p>Don't have an account </p>
        </Link>
        <button type="submit" className="btn #673ab7 deep-purple">
          Login
        </button>
      </form>
    </div>
  );
}

import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SIGNUP_USER } from "../gqloptions/mutations";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [signupUser, { loading, error, data }] = useMutation(SIGNUP_USER);

  if (loading) return <h1>Loading....</h1>;
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signupUser({
      variables: {
        newUser: formData,
      },
    });
  };

  return (
    <div className="container my-container">
      {error && <div className="red card-panel">{error.message}</div>}
      {data && data.user && (
        <div className="green card-panel">
          {data.user.firstName} is SignedUp. You can login now.
        </div>
      )}
      <h5>SignUp!</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          required
          onChange={handleChange}
        />
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
        <Link to="/login">
          <p>Already have an account </p>
        </Link>
        <button type="submit" className="btn #673ab7 deep-purple">
          Submit
        </button>
      </form>
    </div>
  );
}

import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { GET_MY_PROFILE } from "../gqloptions/queries";

export default function Profile() {
  const { loading, error, data } = useQuery(GET_MY_PROFILE);
  console.log(data);
  if(error){
    console.log(error.message)
  }
  if (loading) return <h1>Loading....</h1>;
  return (
    <div className="container my-container">
      <div className="center-align">
        <img
          className="circle"
          style={{ border: "2px solid", marginTop: "10px" }}
          src={`https://robohash.org/${data.user.firstName}.png?size=200x200`}
          alt=""
        />
        <h5>
          {data.user.firstName} {data.user.lastName}
        </h5>
        <h5>Email - {data.user.email}</h5>
      </div>
      <h3>Your Quotes</h3>
      {data.user.quotes.map((quo) => (
        <blockquote key={quo.name}>
          <h6>{quo.name}</h6>
          <p className="right-align">{quo.by.name}</p>
        </blockquote>
      ))}
    </div>
  );
}

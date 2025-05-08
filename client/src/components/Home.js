import { useQuery } from "@apollo/client";
import React from "react";
import { GET_ALL_QUOTES } from "../gqloptions/queries.js";

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_QUOTES);

  if (loading) return <h1>Loading....</h1>;
  if (error) {
    console.log(error.message);
  }

  if (data.quotes.length === 0) {
    return <h2>No Quotes available</h2>;
  }

  return (
    <div className="container">
      {data.quotes.map((quote) => (
        <blockquote key={quote.name}>
          <h6>{quote.name}</h6>
          <p className="right-align">~{quote.by.firstName}</p>
        </blockquote>
      ))}
    </div>
  );
}

import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_QUOTE } from "../gqloptions/mutations";
import { useNavigate } from "react-router-dom";
import { GET_ALL_QUOTES } from "../gqloptions/queries";

export default function CreateQuote() {
  const navigate = useNavigate();
  const [quote, setQuote] = useState("");
  const [createQuote, { loading, error, data }] = useMutation(CREATE_QUOTE, {
    refetchQueries: [GET_ALL_QUOTES, "getAllQuotes"],
  });

  if (loading) return <h1>Loading....</h1>;

  const handleSubmit = (e) => {
    e.preventDefault();
    createQuote({
      variables: {
        name: quote,
      },
    });
  };

  return (
    <div className="container my-container">
      {error && <div className="red card-panel">{error.message}</div>}
      {data && <div className="red card-panel">{data.quote}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Quote"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
        />
        <button type="submit" className="btn green">
          create
        </button>
      </form>
    </div>
  );
}

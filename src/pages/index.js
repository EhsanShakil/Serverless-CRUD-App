import React, { useState, useEffect } from "react";
import FormikForm from "./index";
import { Link, navigate } from "gatsby";

export default function Home() {
  const [mydata, setData] = useState("Default Hello");

  useEffect(() => {
    console.log("useEffect Called");
    fetch(`/.netlify/functions/hello`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log("Data: " + data);
      });
  }, []);

  return (
    <div>
      <h1>Static Data</h1>
      <h1>Serverless CRUD App</h1>
      <div>Hello world with Gatsby from Netlify!</div>
      <h1>Data Coming From FaunaDB</h1>
      <h2>
        <span>Name:</span> {mydata.name}
      </h2>
      <h2>
        <span>Age:</span> {mydata.age}
      </h2>
      <Link to="/form">Form Page</Link>
    </div>
  );
}

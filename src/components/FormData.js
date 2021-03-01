import React, { useState, useEffect } from "react";

export default function FormData() {
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    fetch(`/.netlify/functions/forms`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, [data]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2>Your Details</h2>
      <table
        style={{
          width: "20%",
        }}
      >
        <tr
          style={{
            textAlign: "center",
          }}
        >
          <th>Name</th>
          <th>Age</th>
        </tr>
        {data.map((details, index) => (
          <tr key={index} style={{ textAlign: "center" }}>
            <td>{details.data.name}</td>
            <td>{details.data.age}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

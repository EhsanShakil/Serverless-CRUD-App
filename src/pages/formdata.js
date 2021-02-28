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
  }, []);
  if (!data) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <h1>Form Data</h1>
      <table>
        <tr
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <th>Name</th>
          <th>Age</th>
        </tr>

        {data.map((details, index) => (
          <tr key={index}>
            <td>{details.data.name}</td>
            <td>{details.data.age}</td>
          </tr>
        ))}
      </table>
      {/* <div key={index}> */}
      {/* <h2> */}
      {/* <span>Name:</span> {details.data.name} */}
      {/* </h2> */}
      {/* <h2> */}
      {/* <span>Age:</span> {details.data.age} */}
      {/* </h2> */}
      {/* </div> */}
    </div>
  );
}

import React, { useState, useEffect } from "react";

export default function FormData() {
  const [data, setData] = useState([]);
  // const [id, setId] = useState();

  useEffect(() => {
    fetch(`/.netlify/functions/forms`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  const delelte = (id) => {
    console.log("ID", id);
    fetch(`/.netlify/functions/delete`, {
      method: "delete",
      body: JSON.stringify(id),
    }).then((response) => response.json());
  };

  return (
    <div>
      <h2>Your Details</h2>
      <table className="table">
        <tr
          style={{
            textAlign: "center",
          }}
        >
          <th>Name</th>
          <th>Age</th>
          <th>Delete</th>
        </tr>
        {data.map((details, index) => (
          <tr key={index} style={{ textAlign: "center" }}>
            {console.log(details)}
            <td>{details.data.name}</td>
            <td>{details.data.age}</td>
            {/* {setId(details.ts)} */}
            <button onClick={() => delelte(details.ts)}>Delete</button>
            {/* {console.log(details.ts)} */}
          </tr>
        ))}
      </table>
    </div>
  );
}

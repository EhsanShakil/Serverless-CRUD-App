import React, { useState, useEffect } from "react";

export default function FormData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`/.netlify/functions/forms`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, [data]);
  const deleteTask = async (id) => {
    console.log(id);
    await fetch(`/.netlify/functions/delete`, {
      method: "DELETE",
      body: JSON.stringify(id),
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => `error here : ${error}`);
  };
  const updateTask = async (id, name, age) => {
    console.log(id, name, age);
    await fetch(`/.netlify/functions/update`, {
      method: "PUT",
      body: JSON.stringify({ id, name, age }),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
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
          <th>Remove</th>
        </tr>
        {data.map((details, index) => (
          <tr key={index} style={{ textAlign: "center" }}>
            {console.log(details)}
            <td>{details.data.name}</td>
            <td>{details.data.age}</td>
            <button
              className="deleteButton"
              onClick={async () => {
                deleteTask(details.ref["@ref"].id);
              }}
            >
              Delete
            </button>
          </tr>
        ))}
      </table>
    </div>
  );
}

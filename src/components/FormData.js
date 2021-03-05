import React, { useState, useEffect } from "react";

export default function FormData() {
  const [data, setData] = useState([]);
  const [startUseffect, setUseEffect] = useState();

  // const [id, setId] = useState();

  useEffect(() => {
    fetch(`/.netlify/functions/forms`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, [startUseffect]);
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
            <button
              onClick={async () => {
                deleteTask(details.ref["@ref"].id);
                setUseEffect(true);
              }}
            >
              Delete
            </button>
            {/* {console.log(details.ts)} */}
          </tr>
        ))}
      </table>
    </div>
  );
}

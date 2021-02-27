import React, { useState, useEffect } from "react";

export default function FormData() {
  const [mydata, setData] = useState("Default Hello");

  useEffect(() => {
    fetch(`/.netlify/functions/formdetails`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div>
      <h1>Form Data</h1>
      {console.log("Data: " + mydata.name)}
    </div>
  );
}

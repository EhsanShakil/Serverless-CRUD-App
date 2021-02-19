import React, { useEffect, useState } from "react";

function Home() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("/netlify/functions/hello/")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  console.log(data);
  return (
    <div>
      {/* <h1>Serverless CRUD App</h1> */}
      <h2>{data.message}</h2>
    </div>
  );
}

export default Home;

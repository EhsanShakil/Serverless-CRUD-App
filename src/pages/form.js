import React, { useState, useEffect } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import TextField from "@material-ui/core/TextField";
import "./form.css";

export default function FormikForm() {
  const [mydata, setData] = useState();
  const [details, setDetails] = useState([]);
  // console.log("mydata", mydata);
  // console.log("details", details);

  return (
    <div className="container">
      <h2>Submit Your Details</h2>
      <Formik
        initialValues={{
          name: "",
          age: null,
        }}
        onSubmit={(values) => {
          // console.log(values);
          fetch(`/.netlify/functions/add`, {
            method: "post",
            body: JSON.stringify(values),
          })
            .then((response) => response.json())
            .then((data) => {
              details.push(data);
              setData(data);
            });
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit} className="form">
            <div>
              <Field
                type="text"
                as={TextField}
                variant="outlined"
                label="Name"
                name="name"
                id="name"
                required
              />
              <ErrorMessage
                name="name"
                render={(msg) => <span style={{ color: "red" }}>{msg}</span>}
              />
            </div>
            <div>
              <Field
                type="number"
                as={TextField}
                label="Age"
                variant="filled"
                name="age"
                id="age"
                required
              />
              <ErrorMessage name="age" />
            </div>
            <div>
              <button className="button" type="submit">
                Add
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {details.map((data, index) => {
        return (
          <div key={index} className="data">
            <h3>{data.name}</h3>
            <h3>{data.age}</h3>
          </div>
        );
      })}
    </div>
  );
}

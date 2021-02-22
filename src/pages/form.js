import React, { useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import TextField from "@material-ui/core/TextField";
import "./form.css";

export default function FormikForm() {
  const [mydata, setData] = useState("");

  return (
    <div className="container">
      <h2>Submit Your Details</h2>
      <Formik
        initialValues={{
          name: "",
          age: null,
        }}
        onSubmit={(values) => {
          console.log(values);
          fetch(`/.netlify/functions/add`, {
            method: "post",
            body: JSON.stringify(values),
          })
            .then((response) => response.json())
            .then((data) => {
              setData(data);
              console.log("Data: " + JSON.stringify(data));
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
      <h3>{mydata.id}</h3>
      <h3>{mydata.name}</h3>
      <h3>{mydata.age}</h3>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import TextField from "@material-ui/core/TextField";
import FormData from "../components/FormData";

export default function FormikForm() {
  const [mydata, setData] = useState();
  return (
    <>
      <div className="container">
        <h2>Submit Your Details</h2>
        <Formik
          initialValues={{
            name: "",
            age: null,
          }}
          onSubmit={(values) => {
            fetch(`/.netlify/functions/add`, {
              method: "post",
              body: JSON.stringify(values),
            })
              .then((response) => response.json())
              .then((data) => {
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
      </div>
      <FormData />
    </>
  );
}

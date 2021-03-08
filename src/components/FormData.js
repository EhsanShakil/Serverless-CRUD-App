import React, { useState, useEffect } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import TextField from "@material-ui/core/TextField";
import Modal from "react-modal";

export default function FormData() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

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

  const openModal = () => {
    setOpen(true);
  };

  const afterOpenModal = () => {
    <div>
      <Formik
        initialValues={{ name: "", age: null }}
        onSubmit={(values) => {
          updateTask(values.name, values.age, updateId);
          setUseEffect(true);
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <Field as={TextField} variant="outlined" name="name" label="Name" />
            <Field as={TextField} variant="outlined" name="age" label="Age" />
            <div style={{ marginTop: "20px" }}>
              <Button type="submit" color="secondary" variant="outlined">
                Update
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>;
  };

  const closeModal = () => {
    setOpen(false);
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
      <Modal
        isOpen={open}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      ></Modal>
    </div>
  );
}

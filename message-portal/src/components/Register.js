import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router
// import { useHistory } from "react-router-dom"; // Import useHistory from React Router


const Register = ({ state }) => {
  const navigate = useNavigate(); // Initialize navigate from React Router
  // const history = useHistory(); // Initialize history from React Router

  const [formData, setFormData] = useState({
    vehicle: "",
    x: "",
    y: "",
    speed: "",
    acc: "",
    heading: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const reg = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const { vehicle, x, y, speed, acc, heading } = formData;
    // const vehicle = document.querySelector("#vehicle").value;
    // const x = document.querySelector("#x").value;
    // const y = document.querySelector("#y").value;
    // const speed = document.querySelector("#speed").value;
    // const acc = document.querySelector("#acc").value;
    // const heading = document.querySelector("#heading").value;

    console.log(vehicle, x, y, speed, acc, heading, contract);

    const amount = { value: ethers.utils.parseEther('0.001') };
    try {
      //const transaction = await contract.someFunction();
      const transaction = await contract.registerVehicle(
        vehicle,
        x,
        y,
        speed,
        acc,
        heading,
        amount
      );
      await transaction.wait();
      console.log('Transaction is done');
      // Save user inputs to JSON-Server
      saveToServer(formData);
      navigate("/Registration");
      
    } catch (error) {
      let errorMessage = "An error occurred.";
      if (error.error && error.error.data && error.error.data.originalError) {
        errorMessage = error.error.data.originalError.message;
      }
      alert("Contract Error: " + errorMessage);
    }
  };

  const saveToServer = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("User input saved to JSON-Server");
      } else {
        console.error("Failed to save user input to JSON-Server");
      }
    } catch (error) {
      console.error("Error saving user input to JSON-Server", error);
    }
  };


  return (
    <>
      <div className="container-md" style={{ width: '50%', marginTop: '25px' }}>
        <form onSubmit={reg} method="POST">
          <div className="mb-3">
            <label className="form-label">Vehicle ID: </label>
            <input
              type="text"
              className="form-control"
              id="vehicle"
              placeholder="Enter vehicle"
              value={formData.vehicle}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Longitude:</label>
            <input
              type="text"
              className="form-control"
              id="x"
              placeholder="Enter longitude"
              value={formData.x}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Latitude:</label>
            <input
              type="text"
              className="form-control"
              id="y"
              placeholder="Enter latitude"
              value={formData.y}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Speed:</label>
            <input
              type="text"
              className="form-control"
              id="speed"
              placeholder="Enter vehicle speed"
              value={formData.speed}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Acceleration:</label>
            <input
              type="text"
              className="form-control"
              id="acc"
              placeholder="Enter vehicle acceleration"
              value={formData.acc}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Heading:</label>
            <input
              type="text"
              className="form-control"
              id="heading"
              placeholder="Enter heading"
              value={formData.heading}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={!state.contract}
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;

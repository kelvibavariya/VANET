import React, { useState } from 'react';
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router

const Message = ({ state }) => {
  const navigate = useNavigate(); // Initialize navigate from React Router
  // const history = useHistory(); // Initialize history from React Router

  const [formData, setFormData] = useState({
    sender_id: "",
    recipient_id: "",
    message: "",
    latitude: "",
    longitude: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const msg = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const { sender_id, recipient_id, message, latitude, longitude } = formData;
    // const name = document.querySelector("#vid").value; //sender
    // const recipientAdd = document.querySelector("#recipientAdd").value; //recipient
    // const message = document.querySelector("#message").value;
    // const latitude = document.querySelector("#latitude").value;
    // const longitude = document.querySelector("#longitude").value;
    //console.log(name, message, contract);
    const amount = { value: ethers.utils.parseEther("0.001") };
    try{
    const transaction = await contract.sendMessage(sender_id, recipient_id, message, latitude, longitude, amount);
    await transaction.wait();
    console.log("Transaction is done");
    saveToServer(formData);
    navigate("/Chat");
    }catch(error) {
      let errorMessage = "An error occurred.";
      if (error.error && error.error.data && error.error.data.originalError) {
        errorMessage = error.error.data.originalError.message;
      }
      alert("Contract Error: " + errorMessage);
    }
  };

  const saveToServer = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/messages", {
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
      <div className="container-md" style={{ width: "50%", marginTop: "25px"}}>
        <form onSubmit={msg}>

        <div className="mb-3">
            <label className="form-label">Sender Vehicle ID: </label>
            <input
              type="text"
              className="form-control"
              id="sender_id"
              placeholder="Enter Vehicle id"
              value={formData.sender_id}
              onChange={handleChange}
            />
          </div>

        <div className="mb-3">
            <label className="form-label">Recipient Vehicle ID: </label>
            <input
              type="text"
              className="form-control"
              id="recipient_id"
              placeholder="Enter address of recipient"
              value={formData.recipient_id}
              onChange={handleChange}
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Message: </label>
            <input
              type="text"
              className="form-control"
              id="message"
              placeholder="Enter Your Message"
              value={formData.message}
              onChange={handleChange}
            />
          </div>
            <div className="mb-3">
            <label className="form-label">Latitude: </label>
            <input
              type="text"
              className="form-control"
              id="latitude"
              placeholder="Enter Latitude"
              value={formData.latitude}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Longitude: </label>
            <input
              type="text"
              className="form-control"
              id="longitude"
              placeholder="Enter Longitude"
              value={formData.longitude}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!state.contract}
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};
export default Message;
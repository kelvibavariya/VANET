import React from 'react';
import { useState, useEffect } from "react";
const Display = ({ state }) => {
  const [sent, setSent] = useState([]);
  const [receive, setReceive] = useState([]);
  const { contract } = state;
    const display = async (event) => {
      event.preventDefault();
      const add = document.querySelector("#add").value;
      try{
      const s = await contract.getSentMessages(add);
      const r = await contract.getReceivedMessages(add);
      setSent(s);
      setReceive(r);
      console.log("Transaction is done");
      }catch (error) {
        // let errorMessage = "An error occurred.";
        // if (error.error && error.error.data && error.error.data.originalError) {
        //   errorMessage = error.error.data.originalError.message;
        // }
        alert("Contract Error:Vehicle is not registered.");
      }
    };

  return (
    <>
        <div className="container-md" style={{ width: "50%", marginTop: "25px"}}>
            <form onSubmit={display}>
                  <div className="mb-3">
                  <label className="form-label">Vehicle ID: </label>
                  <input
                    type="text"
                    className="form-control"
                    id="add"
                    placeholder="Enter address"
                  />
                  </div>
                  <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!state.contract}
                  >
                  Details
                  </button>
            </form>
        </div>


        <p style={{ textAlign: "center", marginTop: "20px" }}>Sent Messages</p>
        {sent.map((memo) => {
        return (
          <div
            className="container-fluid"
            style={{ width: "100%" }}
            key={Math.random()}
          >
            <table
              style={{
                marginBottom: "10px",
              }}
            >
              <tbody>
                <tr>
                <td
                    style={{
                      backgroundColor: "#96D4D4",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "800px",
                    }}
                  >
                    {new Date(memo.timestamp * 1000).toLocaleString()}
                  </td>
                  <td
                    style={{
                      backgroundColor: "#96D4D4",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "100px",
                    }}
                  >
                    {memo.recipient}
                  </td>
                  <td
                    style={{
                      backgroundColor: "#96D4D4",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "300px",
                    }}
                  >
                    {memo._message}
                  </td>
                  
                  <td
                    style={{
                      backgroundColor: "#96D4D4",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "300px",
                    }}
                  >
                    {memo.latitude}
                  </td>
                  <td
                    style={{
                      backgroundColor: "#96D4D4",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "300px",
                    }}
                  >
                    {memo.longitude}
                  </td>
                  
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
      <p style={{ textAlign: "center", marginTop: "20px" }}>Received Messages</p>
      {receive.map((memo) => {
        return (
          <div
            className="container-fluid"
            style={{ width: "100%" }}
            key={Math.random()}
          >
            <table
              style={{
                marginBottom: "10px",
              }}
            >
              <tbody>
                <tr>
                <td
                    style={{
                      backgroundColor: "#96D4D4",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "800px",
                    }}
                  >
                    {new Date(memo.timestamp * 1000).toLocaleString()}
                  </td>
                  <td
                    style={{
                      backgroundColor: "#96D4D4",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "100px",
                    }}
                  >
                    {memo.sender}
                  </td>
                  <td
                    style={{
                      backgroundColor: "#96D4D4",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "300px",
                    }}
                  >
                    {memo._message}
                  </td>
                  
                  <td
                    style={{
                      backgroundColor: "#96D4D4",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "300px",
                    }}
                  >
                    {memo.latitude}
                  </td>
                  <td
                    style={{
                      backgroundColor: "#96D4D4",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "300px",
                    }}
                  >
                    {memo.longitude}
                  </td>
                  
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </>
  )
}
export default Display;
// import abi from "../contracts/vanet.json";
// import { useState, useEffect } from "react";
// import { ethers } from "ethers";
import Register from "../components/Register";
import Registered from "../components/Registered";
import reg from "../reg.png";
import "../App.css";
import { Link } from 'react-router-dom';

function Registration({ state }) {
  // const [state, setState] = useState({
  //   provider: null,
  //   signer: null,
  //   contract: null,
  // });
  // const [account, setAccount] = useState("None");
  // useEffect(() => {
  //   const connectWallet = async () => {
  //     const contractAddress = "0xfa8f0c506bD8fFc58Ff24E894844F2813A7D1c95";
  //     const contractABI = abi.abi;
  //     try {
  //       const { ethereum } = window;

  //       if (ethereum) {
  //         const account = await ethereum.request({
  //           method: "eth_requestAccounts",
  //         });

  //         window.ethereum.on("chainChanged", () => {
  //           window.location.reload();
  //         });

  //         window.ethereum.on("accountsChanged", () => {
  //           window.location.reload();
  //         });

  //         const provider = new ethers.providers.Web3Provider(ethereum);
  //         const signer = provider.getSigner();
  //         const contract = new ethers.Contract(
  //           contractAddress,
  //           contractABI,
  //           signer
  //         );
  //         setAccount(account);
  //         setState({ provider, signer, contract });
  //       } else {
  //         alert("Please install metamask");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   connectWallet();
  // }, []);
  // console.log(state);
  return (
    <div style={{ backgroundColor: "#EFEFEF", height: "100%" }}>
      {/* <img src={reg} className="img-fluid" alt=".." width="100%" /> */}
      <img src={reg} className="mx-auto d-block" alt=".." height="50%" />
      <p
        class="text-muted lead "
        style={{ marginTop: "10px", marginLeft: "5px" }}
      >
        {/* <small>Connected Account - {account}</small> */}
      </p>
      <div className="container">
        <Register state={state} />
        <Registered state={state} />
        
      </div>
      <button
            type="submit"
            className="btn btn-warning"
            disabled={!state.contract}
          >
        <Link to="/Chat">Start Chat</Link>  
      </button>
      {/* <button className="btn btn-secondary">
      <Link to="/Chat">Start Chat</Link>
      </button> */}
    </div>
  );
}

export default Registration;
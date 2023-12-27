import Registration from './components/Registration';
import Chat from './components/Chat';
import Display from './components/Display';
import abi from "./contracts/vanet.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xFc653e08a178dE3F4eC02C1a2B68a51f7c99Ef93";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);
  return (
    <> 
      <Routes>
        <Route path="/" exact element={<Registration state={state}/>} />
        <Route path="/Registration" exact element={<Registration state={state}/>} />
        <Route path="/Chat" element={<Chat state={state}/>} />
        <Route path="/Display" element={<Display state={state}/>} />
      </Routes>
    </>
  );
}

export default App;
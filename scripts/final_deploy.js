const hre = require("hardhat");

async function main() {
  const vanet = await hre.ethers.getContractFactory("vanet");
// const msg = await hre.ethers.getContractFactory("message");
const contract_1 = await vanet.deploy();
  // const contract_2 = await msg.deploy(); //instance of contract
  
  // const contract = await msg.attach(owner); // Attach to the deployed contract
  await contract_1.deployed();
  // await contract_2.deployed();
  console.log("Address of contract:", contract_1.address);
  // console.log("Address of contract of msg:", contract_2.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
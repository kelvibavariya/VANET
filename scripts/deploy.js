// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function getBalances(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function cosoleBalances(addresses) {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address ${counter} balance:`, await getBalances(address));
    counter++;
  }
}
async function consoleMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const name = memo.name;
    const from = memo.from;
    const message = memo._message;
    const latitude = memo.latitude;
    const longitude = memo.longitude;
    console.log(
      `At ${timestamp},name ${name},address ${from},message ${message},latitude ${latitude},longitude ${longitude}`
    );
  }
}

async function main() {
  //generate address
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const msg = await hre.ethers.getContractFactory("message");
  const contract = await msg.deploy(); //instance of contract
  // const contract = await msg.attach(owner); // Attach to the deployed contract
  await contract.deployed();
  console.log("Address of contract:", contract.address);

  const addresses = [
    owner.address,
    from1.address,
    from2.address,
    from3.address,
  ];
  console.log("Before sending message");
  await cosoleBalances(addresses);

  const amount = { value: hre.ethers.utils.parseEther("1") };
  await contract.connect(from1).sendMessage("from1", "Very nice car", "10.9", "34.7", amount);
  await contract.connect(from2).sendMessage("from2", "This is my car", "56.9", "87.9", amount);
  await contract.connect(from3).sendMessage("from3", "Do you like Thar?","55.6","65.6", amount);

  console.log("After sending message");
  await cosoleBalances(addresses);

  const memos = await contract.getMemos();
  consoleMemos(memos);
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const unlockTime = currentTimestampInSeconds + 60;

  // const lockedAmount = hre.ethers.parseEther("0.001");

  // const lock = await hre.ethers.deployContract("Lock", [unlockTime], {
  //   value: lockedAmount,
  // });

  // await lock.waitForDeployment();

  // console.log(
  //   `Lock with ${ethers.formatEther(
  //     lockedAmount
  //   )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
  // );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

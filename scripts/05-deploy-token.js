const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = "0x3B02fF1e626Ed7a8fd6eC5299e2C54e1421B626B"; // get from browser console
const PLAYER_ADDRESS = "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f"; // change to your own address

async function main() {
  const singer = await ethers.getSigner(PLAYER_ADDRESS);
  const contract = await ethers.getContractAt(
    "Token",
    CONTRACT_ADDRESS,
    singer
  );

  const balance = await contract.balanceOf(PLAYER_ADDRESS);
  console.log(`balance of palyer now is ${balance}`);
  console.log("--------------------------------");

  const signer0 = await ethers.getSigner();
  const address0 = await signer0.getAddress();
  console.log(`my another address in wallet: ${address0}`);
  await contract.transfer(address0, ethers.utils.parseEther("21"));
  console.log("--------------------------------");

  const newbalance = await contract.balanceOf(PLAYER_ADDRESS);
  console.log(`balance of palyer now is ${newbalance}`);
}

main().catch((error) => {
  console.error(error);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
});

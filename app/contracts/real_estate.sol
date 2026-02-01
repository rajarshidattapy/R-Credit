// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RealEstateFractionalToken {
    string public name;
    string public symbol;
    uint8 public decimals = 18;

    address public issuer;
    bytes32 public issuerIdentityHash;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;

    event Issued(bytes32 indexed issuerIdentityHash, uint256 totalSupply);
    event Transfer(address indexed from, address indexed to, uint256 amount);
    event RentReported(uint256 amount);

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _supply,
        bytes32 _issuerIdentityHash
    ) {
        issuer = msg.sender;
        issuerIdentityHash = _issuerIdentityHash;
        name = _name;
        symbol = _symbol;
        totalSupply = _supply * 1e18;
        balanceOf[msg.sender] = totalSupply;

        emit Issued(_issuerIdentityHash, totalSupply);
    }

    function transfer(address to, uint256 amount) external {
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        emit Transfer(msg.sender, to, amount);
    }

    function reportRent(uint256 amount) external {
        require(msg.sender == issuer, "Only issuer");
        emit RentReported(amount);
    }
}

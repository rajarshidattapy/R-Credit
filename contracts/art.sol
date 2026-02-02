// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ArtCollectibleToken {
    address public issuer;
    bytes32 public issuerIdentityHash;
    uint256 public artworkCount;

    struct Artwork {
        string title;
        string provenanceURI;
    }

    mapping(uint256 => Artwork) public artworks;
    mapping(uint256 => address) public ownerOf;

    event ArtworkTokenized(
        uint256 indexed artworkId,
        string title,
        bytes32 issuerIdentityHash
    );

    event Transfer(
        uint256 indexed artworkId,
        address indexed from,
        address indexed to
    );

    constructor(bytes32 _issuerIdentityHash) {
        issuer = msg.sender;
        issuerIdentityHash = _issuerIdentityHash;
    }

    function tokenizeArtwork(
        string memory title,
        string memory provenanceURI
    ) external {
        require(msg.sender == issuer, "Only issuer");
        artworkCount++;
        artworks[artworkCount] = Artwork(title, provenanceURI);
        ownerOf[artworkCount] = issuer;

        emit ArtworkTokenized(
            artworkCount,
            title,
            issuerIdentityHash
        );
    }

    function transfer(uint256 artworkId, address to) external {
        require(ownerOf[artworkId] == msg.sender, "Not owner");
        ownerOf[artworkId] = to;

        emit Transfer(artworkId, msg.sender, to);
    }
}

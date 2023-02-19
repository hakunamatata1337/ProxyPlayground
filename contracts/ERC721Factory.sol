pragma solidity 0.8.17;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "./interfaces/IERC721Implementation.sol";

contract ERC721Factory {
    using Clones for address;

    address public immutable implementation;

    constructor(address _implementation)  {
        require(_implementation != address(0), "implementation cannot be address zero");
        implementation = _implementation;
    }

    function deployERC721(string memory name, string memory symbol) external {
        address token = implementation.clone();
        IERC721Implementation(token).initialize(name, symbol, msg.sender);
    }

}
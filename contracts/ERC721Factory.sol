pragma solidity 0.8.17;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "./ERC721Implementation.sol";

contract ERC721Factory {
    using Clones for address;
    event erc721Deployed(address indexed _user, address _tokenAddress);

    address public immutable implementation;

    constructor()  {
        implementation = address(new ERC721Implementation());
    }

    ///@dev function to deploy proxy contract pointing to erc721 implementation
    ///@param name name of the collection 
    ///@param symbol symbol of the collection 
    function deployERC721(string memory name, string memory symbol) external returns (address){
        address token = implementation.clone();
        emit erc721Deployed(msg.sender, token);
        ERC721Implementation(token).initialize(name, symbol,msg.sender);
       
        return token;
    }

}
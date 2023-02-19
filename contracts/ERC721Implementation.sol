pragma solidity 0.8.17;
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract ERC721Implementation is ERC721Upgradeable, OwnableUpgradeable{
    function initialize(string memory name_, string memory symbol_, address _owner) initializer public {
        __ERC721_init(name_, symbol_);
        __Ownable_init();
        transferOwnership(_owner);
    }
}
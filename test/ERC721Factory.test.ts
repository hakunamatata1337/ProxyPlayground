import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { ERC721Factory, ERC721Implementation } from "../typechain-types";

describe("ERC721Factory", function () {
  let user: SignerWithAddress;
  let ERC721Factory: ERC721Factory;
  let ERC721Implementation: ERC721Implementation;

  beforeEach(async () => {
    [user] = await ethers.getSigners();

    const erc721FactoryFactory = await ethers.getContractFactory(
      "ERC721Factory"
    );
    ERC721Factory = await erc721FactoryFactory.deploy();

    await ERC721Factory.deployed();
  });

  it("Should deploy ERC721Implementation", async () => {
    const name = "Bored Ape Yacht Club";
    const symbol = "BAYC";
    const tx = await ERC721Factory.deployERC721(name, symbol);
    const result = await tx.wait();
    //get the tokenAddress parameter in emitted erc721Deployed event
    const implementationAddress = result.events![0].args![1];

    ERC721Implementation = await ethers.getContractAt(
      "ERC721Implementation",
      implementationAddress
    );

    expect(await ERC721Implementation.name()).to.be.eql(name);
    expect(await ERC721Implementation.symbol()).to.be.eql(symbol);
    expect(await ERC721Implementation.owner()).to.be.eql(user.address);
  });
});

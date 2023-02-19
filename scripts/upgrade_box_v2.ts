import { ethers, upgrades } from "hardhat";

const PROXY = "0x9688f77DB2f0A8E3Ba975c87ADf5f5BD5f08a809";

async function main() {
  const BoxV2 = await ethers.getContractFactory("BoxV2");
  await upgrades.upgradeProxy(PROXY, BoxV2);

  console.log("Box upgraded");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

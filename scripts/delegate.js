const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const GOVERNOR_ADDRESS = process.env.GOVERNOR_ADDRESS;
  const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;
  const OWNER = process.env.OWNER;

  const governor = await ethers.getContractAt("MyGovernor", GOVERNOR_ADDRESS);
  const token = await ethers.getContractAt("MyToken", TOKEN_ADDRESS);

  await token.delegate(OWNER);
  console.log(`Owner address: ${OWNER}`);

  ownerBalance = (await token.balanceOf(OWNER)).toString();

  console.log(`Owner's balance: ${ownerBalance}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

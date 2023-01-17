const { ethers } = require("hardhat");
require("dotenv").config();
const { toUtf8Bytes, keccak256, parseEther } = ethers.utils;

async function main() {
  const GOVERNOR_ADDRESS = process.env.GOVERNOR_ADDRESS;
  const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;
  const OWNER = process.env.OWNER;

  const governor = await ethers.getContractAt("MyGovernor", GOVERNOR_ADDRESS);
  const token = await ethers.getContractAt("MyToken", TOKEN_ADDRESS);

  const balanceBeforeMint = await token.balanceOf(OWNER);

  console.log(`Owner's Balance before execution: ${balanceBeforeMint}`);

  const tx = await governor.execute(
    [TOKEN_ADDRESS],
    [0],
    [token.interface.encodeFunctionData("mint", [OWNER, parseEther("84000")])],
    keccak256(toUtf8Bytes("Give the owner 84000 tokens!"))
  );

  await tx.wait(1);

  const balanceAfterMint = await token.balanceOf(OWNER);

  console.log(`Owner's Balance After execution: ${balanceAfterMint}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

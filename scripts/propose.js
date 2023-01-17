const { ethers } = require("hardhat");
const { parseEther } = ethers.utils;
require("dotenv").config();

async function main() {
  const GOVERNOR_ADDRESS = process.env.GOVERNOR_ADDRESS;
  const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;
  const OWNER = process.env.OWNER;

  const governor = await ethers.getContractAt("MyGovernor", GOVERNOR_ADDRESS);
  const token = await ethers.getContractAt("MyToken", TOKEN_ADDRESS);

  const tx = await governor.propose(
    [TOKEN_ADDRESS],
    [0],
    [token.interface.encodeFunctionData("mint", [OWNER, parseEther("84000")])],
    "Give the owner 84000 tokens!"
  );
  const receipt = await tx.wait();
  const event = receipt.events.find((x) => x.event === "ProposalCreated");
  const { proposalId } = event.args;

  console.log(`Ìd of the new proposal: ${proposalId}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

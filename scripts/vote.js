const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const GOVERNOR_ADDRESS = process.env.GOVERNOR_ADDRESS;
  const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;
  const proposalId = process.env.PROPOSAL_ID;

  const governor = await ethers.getContractAt("MyGovernor", GOVERNOR_ADDRESS);

  let proposalState = await governor.state(proposalId);
  console.log(`Proposal State before casting: ${proposalState}`);

  const tx = await governor.castVote(proposalId, 1);
  const receipt = await tx.wait();
  const voteCastEvent = receipt.events.find((x) => x.event === "VoteCast");
  console.log(voteCastEvent);

  proposalState = await governor.state(proposalId);
  console.log(`Proposal State after casting: ${proposalState}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

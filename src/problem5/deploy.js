// import { ethers } from "ethers";
const { ethers } = require("hardhat");


async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy();

  const Token2 = await ethers.getContractFactory("Token2");
  const token2 = await Token2.deploy();

  console.log("Token address:", token.address);
  
  console.log("Token address:", token2.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
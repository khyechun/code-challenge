// import { ethers } from "ethers";
const { ethers } = require("hardhat");


// const ADDR = "…";   // your contract address
// const ABI = [];    // your contract ABI

// const ADDRESS = "…"; // some wallet address with token balance
// const TOKENS = [    // token contract addresses
// 	"…",
// 	"…",
// ];

// // you can use your own RPC provider url (no need to deploy to mainnet)
// const provider = ethers.providers.getDefaultProvider();

// const test = async () => {
// 	const contract = new ethers.Contract(ADDR, ABI, provider);

//   const balances = await contract.getBalances(ADDRESS, TOKENS);

// 	return balances;
// };

// test().then(console.log);

async function main() {
	const [deployer] = await ethers.getSigners();
  
	console.log("Deploying contracts with the account:", deployer.address);
  
	console.log("Account balance:", (await deployer.getBalance()).toString());
  
	const Token = await ethers.getContractFactory("Token");
	const token = await Token.deploy();
  
	console.log("Token address:", token.address);
  }
  
  main()
	// .then(() => process.exit(0))
	// .catch((error) => {
	//   console.error(error);
	//   process.exit(1);
	// });

const ADDR = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";   // your contract address
const ABI = ['function balanceOf(address account) external view returns (uint256)'];    // your contract ABI

const ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; // some wallet address with token balance
const TOKENS = [    // token contract addresses
	"0x5FbDB2315678afecb367f032d93F642f64180aa3",
	"0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
	// "…",
];

// you can use your own RPC provider url (no need to deploy to mainnet)
const provider = ethers.providers.getDefaultProvider();

const test = async () => {
	const contract = new ethers.Contract(ADDR, ABI, provider);
	console.log(contract)
	console.log("asdf",await contract._deployed())

	//   const balances = await contract.getBalances(ADDRESS, TOKENS);

	const balances = await contract.balanceOf(ADDRESS);

	return balances;
};

test().then(console.log);
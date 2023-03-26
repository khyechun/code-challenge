import { BigNumber, ethers, Contract } from "ethers";

const addresses: Array<string> = [
  '0xb5d4f343412dc8efb6ff599d790074d0f1e8d430',
  '0x0020c5222a24e4a96b720c06b803fb8d34adc0af',
  '0xd1d8b2aae2ebb2acf013b803bc3c24ca1303a392'
]

const swthTokenAddress: string = '0xc0ecb8499d8da2771abcbf4091db7f65158f1468';
const provider: ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.ninicoin.io')
// const provider = new ethers.providers.EtherscanProvider('homestead' ,'6A5GGV2UB9GCJNHXAKSHBIU7RHBHAIW7TN')

const swthTokenContract: Contract = new Contract(swthTokenAddress, [
  'function balanceOf(address account) external view returns (uint256)',
  'function decimals() external view returns (uint8)'
], provider);


async function getBalances(): Promise<void> {
  const decimals: number = await swthTokenContract.decimals()
  addresses.forEach(async (address) => {
    const balance: BigNumber = await swthTokenContract.balanceOf(address);
    console.log(`${address} ${ethers.utils.commify(ethers.utils.formatUnits(balance, decimals))}`);
  });
}

getBalances().catch(console.error);
import type { GetBalanceParameters } from 'viem';
import { createPublicClient, formatEther, http } from 'viem';
import { baseSepolia } from 'viem/chains';

const publicClient = createPublicClient({
  transport: http(),
  chain: baseSepolia,
});

export async function getBalance(address: GetBalanceParameters) {
  const balance = await publicClient.getBalance(address);
  return formatEther(balance);
}
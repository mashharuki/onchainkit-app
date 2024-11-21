'use client';

import { useEffect, useState } from 'react';
import { Header, TransactionWrapper, WalletWrapper } from 'src/components';
import { getBalance } from 'src/utils/viem';
import { useAccount } from 'wagmi';

/**
 * Page Component
 * @returns
 */
export default function Page() {
  // Inside your component
  const [walletBalance, setWalletBalance] = useState('');

  const { address } = useAccount();

  useEffect(() => {
    async function fetchBalance() {
      if (address) {
        const balance = await getBalance({ address });
        setWalletBalance(String(balance));
      }
    }
    fetchBalance();
  }, [address]);

  return (
    <div className="flex h-full w-96 max-w-full flex-col px-1 md:w-[1008px]">
      <Header />
      <section className="templateSection flex w-full flex-col items-center justify-center gap-4 rounded-xl bg-gray-100 px-2 py-4 md:grow">
        <div className="flex h-[450px] w-[450px] max-w-full items-center justify-center rounded-xl bg-[#030712]">
          <div className="rounded-xl bg-[#F3F4F6] px-4 py-[11px]">
            <p className="font-normal text-indigo-600 text-xl not-italic tracking-[-1.2px]">
              { !address ? 'Please Connect' : <>Your Balance is {walletBalance} ETH</>}
            </p>
          </div>
        </div>
        {address ? (
          <TransactionWrapper address={address} />
        ) : (
          <WalletWrapper
            className="w-[450px] max-w-full"
            text="Sign in to transact"
          />
        )}
      </section>
    </div>
  );
}

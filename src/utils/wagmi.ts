'use client';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  rainbowWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { intmaxwalletsdk } from 'intmax-walletsdk/rainbowkit';
import { useMemo } from 'react';
import { createConfig, http } from 'wagmi';
import { base, baseSepolia, soneiumMinato } from 'wagmi/chains';
import { coinbaseWallet } from "wagmi/connectors";
import { NEXT_PUBLIC_WC_PROJECT_ID } from './config';

/**
 * wagmi configuration
 * @returns
 */
export function useWagmiConfig() {
  const projectId = NEXT_PUBLIC_WC_PROJECT_ID ?? '';

  if (!projectId) {
    const providerErrMessage =
      'To connect to all Wallets you need to provide a NEXT_PUBLIC_WC_PROJECT_ID env variable';
    throw new Error(providerErrMessage);
  }

  // coinbaseWallet.preference = 'smartWalletOnly';
  // coinbaseWallet.preference = 'all';

  return useMemo(() => {
    const connectors = connectorsForWallets(
      [
        /*
        {
          groupName: 'Recommended Wallet',
          wallets: [coinbaseWallet],
        },
        */
        {
          groupName: 'Other Wallets',
          wallets: [rainbowWallet, metaMaskWallet],
        },
        {
          groupName: 'IntmaxWallet',
          wallets: [
            intmaxwalletsdk({
              wallet: {
                url: 'https://wallet.intmax.io',
                name: 'INTMAX Wallet',
                iconUrl: 'https://wallet.intmax.io/favicon.ico',
              },
              metadata: {
                name: 'OnChainKit Sample App',
                description: 'OnChainKit Sample App',
                icons: ['https://wallet.intmax.io/favicon.ico'],
              },
            }),
          ],
        },
      ],
      {
        appName: 'onchainkit',
        projectId,
      },
    );

    const wagmiConfig = createConfig({
      chains: [base, baseSepolia, soneiumMinato],
      // turn off injected provider discovery
      multiInjectedProviderDiscovery: false,
      connectors: [
        coinbaseWallet({
          appName: "Coinbase Smart Wallet Test",
          preference: "smartWalletOnly",
          appLogoUrl:
            "https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/8d5cc37f-f422-4bf9-aa9e-759fbefb5be5/alpha-280/w=256,quality=90,fit=scale-down",
        }),
      ],
      ssr: true,
      transports: {
        [base.id]: http(),
        [baseSepolia.id]: http(),
        [soneiumMinato.id]: http(),
      },
    });

    return wagmiConfig;
  }, [projectId]);
}

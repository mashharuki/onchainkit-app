'use client';

import WalletWrapper from './../WalletWrapper';

/**
 * Login Button Component
 * @returns
 */
export default function LoginButton() {
  return (
    <WalletWrapper
      className="min-w-[90px]"
      text="Log in"
      withWalletAggregator={true}
    />
  );
}

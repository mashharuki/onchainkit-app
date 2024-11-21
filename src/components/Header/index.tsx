'use client';

import { ONCHAINKIT_LINK } from 'src/utils/links';
import { useAccount } from 'wagmi';
import { OnchainkitSvg } from './../../svg';
import LoginButton from './../LoginButton';
import SignupButton from './../SignupButton';

/**
 * Header Component
 */
export default function Header() {
  const { address } = useAccount();

  return (
    <section className="mt-6 mb-6 flex w-full flex-col md:flex-row">
        <div className="flex w-full flex-row items-center justify-between gap-2 md:gap-0">
          <a
            href={ONCHAINKIT_LINK}
            title="onchainkit"
            target="_blank"
            rel="noreferrer"
          >
            <OnchainkitSvg />
          </a>
          <div className="flex items-center gap-3">
            <SignupButton />
            {!address && <LoginButton />}
          </div>
        </div>
      </section>
  );
}
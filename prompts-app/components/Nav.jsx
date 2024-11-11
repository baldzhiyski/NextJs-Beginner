"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  // Retrieve session data to check if the user is logged in
  const { data: session } = useSession();

  // State to hold authentication providers (e.g., Google, Facebook, etc.)
  const [providers, setProviders] = useState(null);
  
  // State to control the display of the dropdown menu on mobile view
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    // Fetch available authentication providers when the component mounts
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      {/* Logo and Home Link */}
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          // If user is logged in, show profile, create post, and sign out options
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Post
            </Link>

            <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </button>

            {/* Profile Picture */}
            <Link href='/profile'>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          // If user is not logged in, show the sign-in buttons for each provider
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          // If user is logged in, show profile picture and toggle dropdown on click
          <div className='flex'>
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {/* Dropdown Menu for Mobile */}
            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          // If user is not logged in, show sign-in buttons for each provider
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;

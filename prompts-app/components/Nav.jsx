"use-client";

import React from 'react'
import Link from '@node_modules/next/link'
import Image from '@node_modules/next/image'
import { useState,useEffect } from '@node_modules/react/cjs/react.production'
import {signIn,signOut,useSession,getProviders} from 'next-auth/react'

const Nav = () => {
  const isUserLoggedIn = true;
  return (
    <nav className = "flex-between w-full mb-16 pt-3">
     <Link href ="/" className="flex gap-2 flex-center">
     <Image src = "/assets/images/logo.svg" alt="Logo" width={30} height = {30} className="object-contain">

     </Image>
     <p className="logo_text"> Promptopia</p>
     </Link>

     {/*Mobile navigation */}
     <div className="sm:flex hidden">

     </div>
      {isUserLoggedIn ? (
        <div className="flex gap-3 md:gap5">
          <Link href="/create-prompt" className="black_btn">Create Post</Link>
        </div>
      ) : <> </>}
    </nav>
  )
}

export default Nav

import Head from 'next/head';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

import { Application } from '../enums'
import Navbar from '../components/Navbar';

interface IWrapperProps {
  style: React.HTMLAttributes<HTMLDivElement>;
  title: Capitalize<string>;
  desc: string;
  children: any;
}

const Wrapper = ({
  style,
  title,
  desc,
  children
}: IWrapperProps) => {

  const { data: sessionData } = useSession();
  return (
    <>
      <Head>
        <title>{title ?? 'Compile'}</title>
        <meta name="description" content={desc} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main {...style}>
        <Navbar />
        <div className="container justify-center items-center jus px-3 xl:mx-auto flex min-h-screen flex-col">
          <section className="flex items-center justify-center">
            <div className="z-30 space-y-4">
              <h1 className="text-8xl font-black">{title}</h1>
              <p className="w-[600px] leading-loose">{desc}</p>
              <button
                  className="rounded-full border-4 border-black w-1/3 bg-white font-black text-xl p-3"
                  onClick={sessionData ? () => signOut() : () => signIn()}
                >
                  {sessionData ? "Sign out" : "🔐 Authenticate"}
                </button>
            </div>
            <div className="invisible lg:visible z-10">
              <Image src={`/${title}.png`} width={800} height={600} alt={title ?? 'Compile'} />
            </div>
          </section>
          {children}
        </div>
      </main>
    </>
  )
}

export default Wrapper;
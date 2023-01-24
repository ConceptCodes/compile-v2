import Head from "next/head";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

import Navbar from "../components/Navbar";
import { ReactNode } from "react";

interface IWrapperProps {
  style: React.HTMLAttributes<HTMLDivElement>;
  title: Capitalize<string>;
  imgSrc: string;
  desc: string;
  children: ReactNode;
}

const Wrapper = ({ style, title, desc, children, imgSrc }: IWrapperProps) => {
  const { data: sessionData } = useSession();
  return (
    <>
      <Head>
        <title>{title ?? "Compile"}</title>
        <meta name="description" content={desc} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main {...style}>
        <Navbar />
        <div className="jus container flex min-h-screen flex-col items-center justify-center px-3 xl:mx-auto">
          <section className="flex items-center justify-center">
            <div className="z-30 space-y-4">
              <h1 className="text-8xl font-black">{title}</h1>
              <p className="w-[600px] leading-loose">{desc}</p>
              <button
                className="w-1/3 rounded-full border-4 border-black bg-white p-3 text-xl font-black"
                onClick={sessionData ? () => signOut() : () => signIn()}
              >
                {sessionData ? "Sign out" : "🔐 Authenticate"}
              </button>
            </div>
            <div className="invisible z-10 lg:visible">
              <Image
                src={imgSrc}
                width={800}
                height={600}
                alt={title ?? "Compile"}
              />
            </div>
          </section>
          {children}
        </div>
      </main>
    </>
  );
};

export default Wrapper;

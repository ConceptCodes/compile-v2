import type { NextPage } from "next";
import { useState } from 'react';
import { toast } from 'react-toastify';

import { trpc } from "../utils/trpc";

import Wrapper from '../components/Wrapper';

const Paraphrase: NextPage = () => {
  const api = trpc.v1.paraphrase.useMutation();

  const [article, setArticle] = useState("");
  const [_article, setParaphrasedArticle] = useState("");

  const baseTextArea = 'h-[300px] px-3 py-2 text-base w-full text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline';
  
  const paraphraseArticle = () => {
    if (article?.length > 0) {
      api.mutate({ article })
      if (api.error) {
        toast(api.error.message, {
          autoClose: 2000,
          position: 'top-right',
          closeOnClick: true
        })
      } else {
        console.log(article === api.data)
        setParaphrasedArticle("");
        setParaphrasedArticle(api.data as string);
      }
    }
  }

  return (
    <>
      <Wrapper
        title="Paraphrase"
        style={{className: 'bg-red-700'}}
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
      >
        <section className="flex justify-between w-full space-x-4 h-full pt-5">

          <div className="text-black font-bold w-1/2">
            <label className="block mb-1" htmlFor="article">Article</label>
            <textarea id="article" className={`${baseTextArea}`} onChange={val => setArticle(val.target.value)}></textarea>
          </div>

          <div className="text-black font-bold w-1/2">
            <label className="block mb-1" htmlFor="article">Paraphrased Article</label>
            <textarea value={_article} className={`${baseTextArea} bg-red-300 text-red-900`} readOnly />
          </div>

        </section>
        <button onClick={() => paraphraseArticle()}>click me (dev)</button>
      </Wrapper>
    </>
  )
}

export default Paraphrase;
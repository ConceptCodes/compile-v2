import type { NextPage } from "next";
import { useState } from 'react';
import { toast } from 'react-toastify';
import Content from "../components/Content";

import { trpc } from "../utils/trpc";

import Wrapper from '../components/Wrapper';

const Paraphrase: NextPage = () => {
  const api = trpc.v1.paraphrase.useMutation();

  const [article, setArticle] = useState("");
  const [_article, setParaphrasedArticle] = useState("");
  
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
        setParaphrasedArticle("");
        setParaphrasedArticle(api.data as string);
      }
    }
  }

  return (
    <>
      <Wrapper
        title="Paraphrase"
        style={{ className: "bg-red-700" }}
        imgSrc="/paraphrase.png"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
      >
        <section className="flex h-full w-full justify-between space-x-4 pt-5">
          <div className="w-1/2 font-bold text-black">
            <Content
              label="Article"
              value={article}
              onChange={(e) => setArticle(e.target.value)}
            />
          </div>

          <div className="w-1/2 font-bold text-black">
            <Content
              label="Paraphrased Article"
              value={_article}
              readonly
              style="bg-red-300 text-red-900"
            />
          </div>
        </section>
        <button onClick={() => paraphraseArticle()}>click me (dev)</button>
      </Wrapper>
    </>
  );
}

export default Paraphrase;
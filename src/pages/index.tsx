import type { NextPage } from 'next';
import { useState, useEffect, useRef } from 'react'
import { toast, Id } from 'react-toastify';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { trpc } from '../utils/trpc';
import Wrapper from '../components/Wrapper';

const Home: NextPage = () => {
  const api = trpc.v1.summarize.useMutation();

  const [article, setArticle] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [articleWordCount, setArticleWordCount] = useState<number>(0);
  const [summaryWordCount, setSummaryWordCount] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const toastRef = useRef<Id | null>(null);

  const getWordCount = (txt: string): number => {
    return txt.replace(/-/g, ' ').trim().split(/\s+/g).length
  }

  const reset = (): void => {
    setSummary("");
    setArticle("");
  }

  const copyToClipboard = () => {
    if (summaryWordCount > 0) {
      navigator.clipboard.writeText(summary)
      toast.info('Summary Copied to Clipboard 📋')
    }
  }

  useEffect(() => {
    if (api.isSuccess && summary.length === 0) {
      toast.update(toastRef.current as Id, {
        render: "Summary Generated 👌🏾",
        type: "success",
        isLoading: false,
        autoClose: 2000
      });
      setSummary(api.data as string);
    }
    else if (api.isError) {
      console.log(api.error.message)
      toast.update(toastRef.current as Id, {
        render: api.error.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true
      });
    }
  }, [api]);

  useEffect(() => {
    (article.length > 0) ? setArticleWordCount(getWordCount(article))
      : setArticleWordCount(0);
  }, [article])

  useEffect(() => {
    (summary.length > 0) ? setSummaryWordCount(getWordCount(summary))
      : setSummaryWordCount(0);
  }, [summary])

  useEffect(() => {
    const ans = ((articleWordCount - summaryWordCount) / articleWordCount ) * 100;
    setPercentage(Math.round(ans));
  }, [summaryWordCount, articleWordCount])

  const summarizeArticle = () => {
    if (summary.length > 0) setSummary("");
    if (article?.length > 0) {
      toastRef.current = toast.loading("Generating Summary Now...")
      api.mutate({ article });
    } else {
      toast.error('Article is empty.', {
        isLoading: false,
        autoClose: 3000,
        position: 'top-right',
        closeOnClick: true
      });
    }
  }

  const baseTextArea = 'h-[400px] px-3 py-2 text-base w-full text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline';

  return (
    <>
      <Wrapper
        title="Summarize"
        style={{ className: 'bg-purple-700' }}
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      >
        <section className="flex justify-between w-full space-x-4 py-5 items-center">

          <div className="text-black font-bold grow">
            <div className="flex justify-between">
              <label className="block mb-1" htmlFor="article">Article</label>
              {articleWordCount > 0 && <span className="text-white">Word Count: {articleWordCount}</span>}
            </div>
            <textarea 
              value={article} 
              id="article" 
              className={`${baseTextArea} bg-slate-100`} 
              onChange={val => setArticle(val.target.value)}>
            </textarea>
          </div>

          <div className="text-black font-bold grow">
            <div className="flex justify-between">
              <label className="block mb-1" htmlFor="article">AI Generated Summary</label>
              {summaryWordCount > 0 && <span className="text-white">Word Count: {summaryWordCount}</span>}
            </div>

            <textarea
              value={summary}
              className={`${baseTextArea} bg-purple-300 text-purple-900`}
              readOnly />
          </div>
          {(percentage > 0 && summaryWordCount > 0) && (
            <div className="flex flex-col w-[200px] justify-between items-center">
              <CircularProgressbarWithChildren 
                value={percentage}
                styles={
                  buildStyles({
                    pathColor: `#ffffff`,
                    trailColor: 'rgba(0,0,0,.25)',
                    pathTransitionDuration: 0.5,
                    backgroundColor: '#3e98c7',
                  })
                }
              >
                <strong className="text-white text-center text-4xl">{percentage}%</strong>
                <h3 className="">reduced</h3>
              </CircularProgressbarWithChildren>
              <button
                onClick={() => copyToClipboard()}
                className="p-3 mt-5 w-full bg-black rounded-full text-white font-semibold capitalize text-lg">
                Copy 
              </button>
              <button
                onClick={() => reset()}
                className="p-3 mt-5 w-full bg-white border-black border-4 rounded-full font-semibold capitalize text-lg">
                Reset 
              </button>
            </div>
          )}
        </section>
        <button className="text-red-500" onClick={() => summarizeArticle()}>click me (dev)</button>
      </Wrapper>
    </>
  );
};

export default Home;



import type { NextPage } from "next";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { trpc } from "../utils/trpc";
import Wrapper from "../components/Wrapper";
import Content from "../components/Content";

const Home: NextPage = () => {
  const api = trpc.v1.summarize.useMutation();

  const [article, setArticle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [articleWordCount, setArticleWordCount] = useState<number>(0);
  const [summaryWordCount, setSummaryWordCount] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const toastRef = useRef(null);

  const getWordCount = (txt: string): number => {
    return txt.replace(/-/g, " ").trim().split(/\s+/g).length;
  };

  const reset = (): void => {
    setSummary("");
    setArticle("");
    setSummaryWordCount(0);
    setPercentage(0);
  };

  const copyToClipboard = () => {
    if (summaryWordCount > 0) {
      navigator.clipboard.writeText(summary);
      toast.info("Summary Copied to Clipboard 📋");
    }
  };

  useEffect(() => {
    if (api.isSuccess && summary.length === 0) {
      toast.update(toastRef.current, {
        render: "Summary Generated 👌🏾",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      setSummary(api.data as string);
    } else if (api.isError) {
      toast.update(toastRef.current, {
        render: api.error.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });
    }
  }, [api]);

  useEffect(() => {
    summary.length > 0 && setSummaryWordCount(getWordCount(summary));
  }, [summary]);

  useEffect(() => {
    const ans =
      ((articleWordCount - summaryWordCount) / articleWordCount) * 100;
    setPercentage(Math.round(ans));
  }, [summaryWordCount, articleWordCount]);

  const summarizeArticle = () => {
    if (summary.length > 0) setSummary("");
    if (article?.length > 0) {
      toastRef.current = toast.loading("Generating Summary Now...");
      api.mutate({ article });
    } else {
      toast.error("Article is empty.", {
        isLoading: false,
        autoClose: 3000,
        position: "top-right",
        closeOnClick: true,
      });
    }
  };

  return (
    <Wrapper
      title="Summarize"
      style={{ className: "bg-purple-700" }}
      imgSrc="/summarize.png"
      desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    >
      <section className="flex w-full items-center justify-between space-x-4 py-5">
        <div className="grow font-bold text-black">
          <Content
            label="Article"
            value={article}
            onChange={(val) => setArticle(val.target.value)}
            maxLength={3000}
          />
        </div>

        <div className="grow font-bold text-black">
          <Content
            label="Summary"
            value={summary}
            readonly
            style="text-purple-500 bg-purple-100"
          />
        </div>
        {percentage > 0 && (
          <div className="flex w-[200px] flex-col items-center justify-between">
            <CircularProgressbarWithChildren
              value={percentage}
              styles={buildStyles({
                pathColor: `#ffffff`,
                trailColor: "rgba(0,0,0,.25)",
                pathTransitionDuration: 0.5,
                backgroundColor: "#3e98c7",
              })}
            >
              <strong className="text-center text-4xl text-white">
                {percentage}%
              </strong>
              <h3 className="">reduced</h3>
            </CircularProgressbarWithChildren>
            <button
              onClick={copyToClipboard}
              className="mt-5 w-full rounded-full bg-black p-3 text-lg font-semibold capitalize text-white"
            >
              Copy
            </button>
            <button
              onClick={reset}
              className="mt-5 w-full rounded-full border-4 border-black bg-white p-3 text-lg font-semibold capitalize"
            >
              Reset
            </button>
          </div>
        )}
      </section>
      <button className="text-red-500" onClick={() => summarizeArticle()}>
        click me (dev)
      </button>
    </Wrapper>
  );
};

export default Home;

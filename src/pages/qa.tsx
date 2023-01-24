import type { NextPage } from "next";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import { trpc } from "../utils/trpc";
import Wrapper from "../components/Wrapper";
import Content from "../components/Content";
import Chat from "../components/Chat";
import { IChatLog } from "../types";

const QA: NextPage = () => {
  const api = trpc.v1.questionAnswer.useMutation();
  const [messages, setMessages] = useState<IChatLog[]>([]);
  const [article, setArticle] = useState("");

  useEffect(() => {
    if (api.isSuccess) {
      toast("Answer Generated 👌🏾", {
        autoClose: 2000,
        position: "top-right",
        closeOnClick: true,
      });
    } else if (api.isError) {
      toast(api.error.message, {
        autoClose: 2000,
        position: "top-right",
        closeOnClick: true,
      });
    }
  }, [api]);

  const getAnswer = (question: string) => {
    if (article?.length > 0) {
      const chatlog = messages
        .map((msg) =>
          msg.type === "question" ? `Q: ${msg.text}` : `A: ${msg.text}`
        )
        .join("\n");
      api.mutate({ article, question, chatlog });
    }
  };

  return (
    <Wrapper
      title="Question & Answering"
      style={{ className: "bg-blue-700" }}
      imgSrc="/qa.png"
      desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    >
      <section className="flex w-full items-center justify-between space-x-4 py-5">
        <div className="grow font-bold text-black">
          <Content
            label="Article"
            value={article}
            onChange={(e) => setArticle(e.target.value)}
            style="text-blue-500 bg-blue-100"
            maxLength={2000}
          />
        </div>
        <div className="h-1/2 w-1/2">
          <Chat
            onSubmit={(question: string) => {
              getAnswer(question);
              setMessages([...messages, { text: question, type: "question" }]);
            }}
            messages={messages}
          />
        </div>
      </section>
    </Wrapper>
  );
};

export default QA;

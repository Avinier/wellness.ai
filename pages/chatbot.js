import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Chatbot.module.css";

const Chatbot = () => {
  const [messageHistory, setMessageHistory] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [responseHistory, setResponseHistory] = useState([]);
  const [response, setResponse] = useState("");

  async function submitHandler() {
    try {
      const res = await fetch("/api/chatbot-handler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: inputMessage,
          user: "user-1",
        }),
      });

      const resData = await res.json();
      setResponse(resData);

      setMessageHistory([...messageHistory, inputMessage]);
      setResponseHistory([...responseHistory, response]);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h1 className="">Wellness.ai</h1>
      <div className="">
        <input
          className=""
          placeholder="start a conversation with..."
          onChange={(e) => {
            e.preventDefault();
            setInputMessage(e.target.value);
          }}
        />
        <button className="" onClick={submitHandler}>{`->`}</button>
      </div>
      <p className="">{response}</p>
    </>
  );
};

export default Chatbot;

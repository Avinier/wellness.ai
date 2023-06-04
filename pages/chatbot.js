import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Chatbot.module.css";

import { auth } from "./firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState, userAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";

const Chatbot = () => {
  const [messageHistory, setMessageHistory] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [responseHistory, setResponseHistory] = useState([]);
  const [response, setResponse] = useState("");

  const googleAuth = new GoogleAuthProvider();
  const [user, setUser] = useAuthState(auth);
  const [isUser, setIsUser] = useState(false);

  async function login() {
    const res = await signInWithPopup(auth, googleAuth);
  }

  useEffect(() => {
    console.log(user);
    setIsUser(true);
  }, [user]);

  async function submitHandler() {
    try {
      const res = await fetch("/api/chatbot-handler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: inputMessage,
          user: user.email,
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
      <nav>
        <div className="nav">
          {isUser ? (
            <button className="signup-button" onClick={login}>
              SIGN IN
            </button>
          ) : (
            <div>
              <Image
                src={isUser ? user.photoURL : "/logo.png"}
                height={50}
                width={50}
              />
              <p>{isUser ? user.displayName : ""}</p>
            </div>
          )}
        </div>
      </nav>
      <h1 className={styles.title}>Wellness.ai</h1>
      <div className={styles.chatcontainer}>
        <input
          className={styles.userinput}
          placeholder="start a conversation with..."
          onChange={(e) => {
            e.preventDefault();
            setInputMessage(e.target.value);
          }}
        />
        <div className={styles.buttoncontainer}>
          <button className={styles.sendbutton} onClick={submitHandler}>
            Send
          </button>
        </div>
        <p className={styles.response}>{response}</p>
      </div>
    </>
  );
};

export default Chatbot;

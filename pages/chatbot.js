import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Chatbot.module.css";

import { auth } from "../src/firebase";
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

  const [convoFlag, setConvoFlag] = useState(0);

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
          flag: convoFlag,
        }),
      });

      const resData = await res.json();
      setResponse(resData);
      setConvoFlag((prev) => prev + 1);

      setMessageHistory([...messageHistory, inputMessage]);
      setResponseHistory([...responseHistory, response]);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <nav className="nav">
        <Image
          src={"/logo.png"}
          height={72}
          width={89}
          alt="Logo"
          className="logo"
        />
        <button className={styles.signupbtn} onClick={login}>
          SIGN IN
        </button>
      </nav>
      <h1 className={styles.title}>Wellness.ai</h1>
      <div className={styles.chatcontainer}>
        <div className={styles.inputcontainer}>
          <input
            className={styles.userinput}
            placeholder="start a conversation with..."
            onChange={(e) => {
              e.preventDefault();
              setInputMessage(e.target.value);
            }}
          />
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

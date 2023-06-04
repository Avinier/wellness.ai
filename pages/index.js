import { useEffect, useState } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();

  function submitHandler() {
    router.push("/chatbot");
  }
  return (
    <>
      <div className="navbar">
        <ul>
          <li>
            <Image
              src={"/logo.png"}
              height={72}
              width={89}
              alt="Logo"
              className="logo"
            />
          </li>
        </ul>
        <div className="buttons"></div>
      </div>

      <div className={styles.header}>
        <div className={styles.headercontent}>
          <div className={styles.headertext}>
            <h2>
              <span className={styles.get}>Get Awareness Through</span>
            </h2>
            <h1>
              <span className={styles.title}>Wellness.ai</span>
            </h1>
            <br />
            <button className={styles.headerbutton} onClick={submitHandler}>
              Get Started
            </button>
            <p className={styles.tagline}>
              "Embrace Your Mind, Empower Your Life:
              <br />
              Mental Health Matters"
            </p>
          </div>

          <div className={styles.headerimage}>
            <Image
              src={"/banner.png"}
              height={647}
              width={538}
              alt="Header Image"
            />
          </div>
        </div>
      </div>

      {/* <div className="geolocation-info">
        {latitude && longitude ? (
          <p>
            Latitude: {latitude.toFixed(6)}, Longitude: {longitude.toFixed(6)}
          </p>
        ) : (
          <p>Fetching geolocation...</p>
        )}
      </div> */}
    </>
  );
}

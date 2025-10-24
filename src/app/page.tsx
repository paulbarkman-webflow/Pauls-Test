"use client";

import { useState } from "react";
import { Section, Block, Link } from "@/devlink/_Builtin";

interface DadJokeResult {
  id: string;
  joke: string;
}

interface DadJokeAPIResponse {
  results: DadJokeResult[];
  search_term: string;
  status: number;
  total_jokes: number;
}

export default function Home() {
  const [inputWord, setInputWord] = useState("");
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDadJoke = async () => {
    if (!inputWord.trim()) {
      setError("Please enter a word to search for jokes!");
      return;
    }

    setLoading(true);
    setError("");
    setJoke("");

    try {
      const response = await fetch(
        `https://icanhazdadjoke.com/search?term=${encodeURIComponent(inputWord.trim())}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch joke");
      }

      const data: DadJokeAPIResponse = await response.json();

      if (data.results && data.results.length > 0) {
        // Get a random joke from the results
        const randomJoke = data.results[Math.floor(Math.random() * data.results.length)];
        setJoke(randomJoke.joke);
      } else {
        setJoke(`No dad jokes found for "${inputWord}". Try another word!`);
      }
    } catch (err) {
      setError("Oops! Something went wrong. Please try again later.");
      console.error("Error fetching dad joke:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchDadJoke();
  };

  return (
    <Section
      tag="section"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Block tag="div" className="container">
        <Block
          tag="div"
          className="hero-split"
          style={{
            textAlign: "center",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <h1
            className="margin-bottom-24px"
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              background: "linear-gradient(83.21deg, #3245ff 0%, #bc52ee 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Dad Joke Generator
          </h1>
          <Block tag="p" className="margin-bottom-24px" style={{ fontSize: "1.1rem", color: "#666" }}>
            Enter any word and get a hilarious dad joke related to it!
          </Block>

          <form onSubmit={handleSubmit} style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
              <input
                type="text"
                value={inputWord}
                onChange={(e) => setInputWord(e.target.value)}
                placeholder="Enter a word (e.g., cat, pizza, work)..."
                style={{
                  padding: "12px 16px",
                  fontSize: "16px",
                  border: "2px solid #e0e0e0",
                  borderRadius: "8px",
                  outline: "none",
                  minWidth: "250px",
                  transition: "border-color 0.3s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#3245ff")}
                onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
              />
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: "12px 24px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  background: loading ? "#ccc" : "linear-gradient(83.21deg, #3245ff 0%, #bc52ee 100%)",
                  color: "#ffffff",
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontWeight: "600",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                }}
              >
                {loading ? "Finding..." : "Get Joke!"}
              </button>
            </div>
          </form>

          {error && (
            <Block
              tag="div"
              style={{
                padding: "16px",
                backgroundColor: "#fee",
                border: "1px solid #fcc",
                borderRadius: "8px",
                color: "#c33",
                marginBottom: "20px",
              }}
            >
              {error}
            </Block>
          )}

          {joke && (
            <Block
              tag="div"
              style={{
                padding: "24px",
                backgroundColor: "#f9f9f9",
                border: "2px solid #e0e0e0",
                borderRadius: "12px",
                marginBottom: "24px",
                fontSize: "1.2rem",
                lineHeight: "1.6",
                color: "#333",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>😂</div>
              {joke}
            </Block>
          )}

          <div style={{ marginTop: "32px" }}>
            <Link
              button={true}
              options={{
                href: "https://developers.webflow.com/webflow-cloud/getting-started",
              }}
              className="button-primary"
              style={{
                borderRadius: "4px",
                background: "#146ef5",
                color: "#ffffff",
                padding: "12px 24px",
                textDecoration: "none",
                display: "inline-block",
                boxShadow:
                  "0px 0.5px 1px rgba(0, 0, 0, 0.25), inset 0px 29px 23px -16px rgba(255, 255, 255, 0.04), inset 0px 0.5px 0.5px rgba(255, 255, 255, 0.2)",
              }}
            >
              Learn More About Webflow
            </Link>
          </div>
        </Block>
      </Block>
    </Section>
  );
}

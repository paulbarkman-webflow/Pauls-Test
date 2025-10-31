"use client";

import { useState, useEffect } from "react";
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

interface WeatherData {
  current_weather: {
    temperature: number;
    weathercode: number;
  };
}

export default function Home() {
  const [inputWord, setInputWord] = useState("");
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  // Fetch weather data from our API
  const fetchWeather = async () => {
    try {
      setWeatherLoading(true);
      const response = await fetch('/app/api/weather');
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }
      
      const weatherData = await response.json() as WeatherData;
      setWeather(weatherData);
    } catch (error) {
      console.error('Failed to fetch weather:', error);
      // Weather is optional, so we don't show error to user
    } finally {
      setWeatherLoading(false);
    }
  };

  // Fetch weather on component mount
  useEffect(() => {
    fetchWeather();
  }, []);

  // Get weather icon based on weather code (using emojis as fallback)
  const getWeatherIcon = (weathercode: number): string => {
    // Simple emoji mapping for weather codes
    const emojiMap: { [key: number]: string } = {
      0: '☀️',   // Clear sky
      1: '⛅',   // Mainly clear
      2: '☁️',   // Partly cloudy
      3: '☁️',   // Overcast
      45: '🌫️', // Fog
      48: '🌫️', // Depositing rime fog
      51: '🌦️', // Light drizzle
      53: '🌦️', // Moderate drizzle
      55: '🌦️', // Dense drizzle
      56: '🌨️', // Light freezing drizzle
      57: '🌨️', // Dense freezing drizzle
      61: '🌧️', // Slight rain
      63: '🌧️', // Moderate rain
      65: '🌧️', // Heavy rain
      66: '🌧️', // Light freezing rain
      67: '🌧️', // Heavy freezing rain
      71: '❄️',  // Slight snow
      73: '❄️',  // Moderate snow
      75: '❄️',  // Heavy snow
      77: '❄️',  // Snow grains
      80: '🌦️', // Slight rain showers
      81: '🌦️', // Moderate rain showers
      82: '⛈️',  // Violent rain showers
      85: '🌨️', // Slight snow showers
      86: '🌨️', // Heavy snow showers
      95: '⛈️',  // Slight thunderstorm
      96: '⛈️',  // Thunderstorm with hail
      99: '⛈️',  // Heavy thunderstorm with hail
    };
    
    return emojiMap[weathercode] || '🌤️'; // Default weather icon
  };

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

          {/* Weather Widget */}
          {weatherLoading ? (
            <Block tag="div" style={{ marginBottom: "24px", padding: "16px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
              <p style={{ color: "#666", margin: 0 }}>Loading weather...</p>
            </Block>
          ) : weather ? (
            <Block tag="div" style={{ 
              marginBottom: "24px", 
              padding: "16px", 
              backgroundColor: "#f9f9f9", 
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px"
            }}>
              <span style={{ 
                fontSize: "1.5rem", 
                fontWeight: "600",
                color: "#333"
              }}>
                {Math.round(weather.current_weather.temperature)}°F
              </span>
              <span style={{ fontSize: "1.2rem" }}>
                {getWeatherIcon(weather.current_weather.weathercode)}
              </span>
            </Block>
          ) : null}

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

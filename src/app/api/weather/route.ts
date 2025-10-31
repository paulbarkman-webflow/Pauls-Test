import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

// GET /api/weather - Get weather data with KV caching
export async function GET(request: NextRequest) {
  try {
    // Access the environment bindings
    const { env } = await getCloudflareContext({ async: true });
    const weatherCache = env.WEATHER_CACHE;

    // Get User's location from Cloudflare headers
    if (!request.cf) {
      return NextResponse.json(
        { error: "No Cloudflare headers found" },
        { status: 400 }
      );
    }

    const { latitude, longitude } = request.cf;

    // Validate location data
    if (!latitude || !longitude) {
      return NextResponse.json(
        { error: "Location data not available" },
        { status: 400 }
      );
    }

    // Create a cache key from latitude and longitude
    const cacheKey = `${latitude}-${longitude}`;

    try {
      // Try to get the weather data from the cache
      const cachedWeather = await weatherCache.get(cacheKey);

      // If the cached data exists, return it
      if (cachedWeather) {
        return new Response(cachedWeather, {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "X-Cache-Status": "HIT"
          },
        });
      }

      // If NOT cached, fetch weather data from Open-Meteo API
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=fahrenheit`;
      const weatherResponse = await fetch(weatherUrl);

      // If error, return error message
      if (!weatherResponse.ok) {
        throw new Error(`Weather API error: ${weatherResponse.status}`);
      }

      // Parse the weather data
      const weatherData = await weatherResponse.json();

      // Store the fresh weather data in the cache for 10 minutes (600 seconds)
      await weatherCache.put(cacheKey, JSON.stringify(weatherData), {
        expirationTtl: 600, // 10 minutes
      });

      // Return the fresh weather data
      return NextResponse.json(weatherData, {
        status: 200,
        headers: {
          "X-Cache-Status": "MISS"
        }
      });

    } catch (cacheError) {
      console.error("Cache operation failed:", cacheError);
      
      // If cache fails, still try to fetch weather data directly
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=fahrenheit`;
      const weatherResponse = await fetch(weatherUrl);

      if (!weatherResponse.ok) {
        throw new Error(`Weather API error: ${weatherResponse.status}`);
      }

      const weatherData = await weatherResponse.json();
      
      return NextResponse.json(weatherData, {
        status: 200,
        headers: {
          "X-Cache-Status": "BYPASS"
        }
      });
    }

  } catch (error) {
    console.error("Weather API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}

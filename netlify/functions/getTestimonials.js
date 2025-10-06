// netlify/functions/getTestimonials.js

export async function handler(event) {
  // ✅ Only allow GET requests
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const BIN_ID = process.env.JSONBIN_BIN_ID;
  const API_KEY = process.env.JSONBIN_MASTER_KEY;

  try {
    // ✅ Fetch testimonials from JSONBin
    const response = await fetch(
      `https://api.jsonbin.io/v3/b/${BIN_ID}/latest`,
      {
        headers: { "X-Master-Key": API_KEY },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch bin: ${response.status}`);
    }

    const binData = await response.json();

    // ✅ Ensure a safe fallback if structure is missing
    const testimonials = (binData.record && binData.record.testimonials) || [];

    const approvedTestimonials = testimonials.filter(
      (t) => t.status === "approved"
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ approvedTestimonials }),
    };
  } catch (err) {
    console.error("❌ Error fetching testimonials:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to fetch testimonials",
        details: err.message,
      }),
    };
  }
}

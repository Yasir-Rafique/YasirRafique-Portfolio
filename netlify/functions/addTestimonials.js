// netlify/functions/testimonials.js
export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { fullName, role, message, avatar, status } = JSON.parse(event.body);

    const BIN_ID = process.env.JSONBIN_BIN_ID;
    const API_KEY = process.env.JSONBIN_MASTER_KEY;

    const response = await fetch(
      `https://api.jsonbin.io/v3/b/${BIN_ID}/latest`,
      {
        headers: { "X-Master-Key": API_KEY },
      }
    );

    const binData = await response.json();
    console.log(
      "🔍 Raw binData from JSONBin:",
      JSON.stringify(binData, null, 2)
    );

    // Safety fallback
    const currentTestimonials =
      (binData.record && binData.record.testimonials) || [];

    const updatedTestimonials = [
      ...currentTestimonials,
      {
        fullName,
        role,
        message,
        avatar,
        status,
        date: new Date().toISOString(),
      },
    ];

    await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": API_KEY,
      },
      body: JSON.stringify({ testimonials: updatedTestimonials }),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        testimonials: updatedTestimonials,
      }),
    };
  } catch (err) {
    console.error("❌ Error saving testimonial:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to save testimonial" }),
    };
  }
}

import axios from "axios";

export const analyzeResume = async (resumeText) => {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error("OpenRouter API key not configured");
  }

  const trimmedText = resumeText.slice(0, 4000);

  const prompt = `
You are a resume expert.
Return the output STRICTLY in the following format:

SUMMARY:
<one professional paragraph>

SKILLS:
- skill 1
- skill 2
- skill 3

IMPROVEMENTS:
- improvement 1
- improvement 2
- improvement 3

Resume:
${trimmedText}
`;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: process.env.AI_MODEL || "mistralai/mistral-7b-instruct:free",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 15000, // 15 seconds
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("AI API error:", error.response?.data || error.message);
    }
    throw new Error("AI analysis failed");
  }
};

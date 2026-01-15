import axios from "axios";

export const analyzeResume = async (resumeText) => {
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
${resumeText}
`;

  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "mistralai/mistral-7b-instruct:free",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data.choices[0].message.content;
};

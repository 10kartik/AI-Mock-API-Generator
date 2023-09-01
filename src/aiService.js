const OpenAI = require("openai");

const apiKey = process.env.OPENAI_API_KEY; //organisation's personal account key

const openai = new OpenAI({
  apiKey: apiKey,
});

async function callCompletionAPI(prompt) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  console.log(JSON.parse(completion.choices[0].message.content));
}

module.exports = { callCompletionAPI };

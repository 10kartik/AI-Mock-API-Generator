const { json } = require("express");
const OpenAI = require("openai");

const apiKey = process.env.OPENAI_API_KEY; //organisation's personal account key

const openai = new OpenAI({
  apiKey: apiKey,
});

async function callCompletionAPI(prompt) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo-16k",
  });

  console.log("---------AI parsed response ----------- \n", JSON.parse(completion.choices[0].message.content));
  return JSON.parse(completion.choices[0].message.content);
}

async function askAllRoutesListAPI(prompt) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices);
  console.log(completion.choices[0].message.content);
  return JSON.parse(completion.choices[0].message.content);
}

module.exports = { callCompletionAPI, askAllRoutesListAPI };

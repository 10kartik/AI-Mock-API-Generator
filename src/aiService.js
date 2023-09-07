const OpenAI = require("openai");
const {askApiResponsePromptSystem} = require("./promptStrings");

const apiKey = process.env.OPENAI_API_KEY; //organisation's personal account key

const openai = new OpenAI({
  apiKey: apiKey,
});

async function callCompletionAPI(prompt) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: askApiResponsePromptSystem },
        { role: "user", content: prompt }
      ],
      model: "gpt-3.5-turbo-16k",
    });

    if (
      completion.choices[0].message &&
      completion.choices[0].message.content
    ) {
      const parsedContent = JSON.parse(completion.choices[0].message.content);
      console.log("---------AI parsed response ----------- \n", parsedContent);
      return parsedContent;
    } else {
      // Handle the case when GPT-3.5 Turbo response does not contain valid content
      throw new Error("GPT-3.5 Turbo response does not contain valid content");
    }
  } catch (error) {
    // Handle errors that occur during the API call
    console.error("Error calling GPT-3.5 Turbo API:", error);
    throw error; // You can choose to return a specific error message or object here
  }
}


module.exports = { callCompletionAPI };

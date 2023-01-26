'use strict';
const bolt = require('@slack/bolt')
const dotenv = require('dotenv');
dotenv.config();

const {Configuration, OpenAIApi} = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = new bolt.App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
  logLevel: 'debug'
});

app.message(async ({ message, say }) => {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: message.text,
    temperature: 0,
    max_tokens: 3000,
  })

  await say(response.data.choices[0].text)
})

app.start();
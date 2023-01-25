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


app.message(({message, say}) => {
  (async (prompt) => {
    const response = await openai.createCompletion({
      model:"text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
    });
    say(response.data.choices[0].text);
  })(message.text);
});

app.start();
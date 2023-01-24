'use strict';
const bolt = require('@slack/bolt')
const dotenv = require('dotenv');
dotenv.config();

const app = new bolt.App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
  logLevel: 'debug'
});

app.message(/hello/i, ({message, say}) => {
  say(`こんにちは！ <@${message.user}>さん`);
});

app.start();
'use strict'
const bolt = require('@slack/bolt')
const dotenv = require('dotenv')
dotenv.config()

const { Configuration, OpenAIApi } = require('openai')
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

const app = new bolt.App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
  logLevel: 'debug',
})

app.message(async ({ message, say }) => {
	try {
		const response = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages: [{ role: "user", content: message.text }],
		})
		await say(response.data.choices[0].message.content)
	} catch (error) {
		await say('エラー。' + '\nmessage:' + error.message)
	}
})

app.start()

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway'
import { formatJSONResponse } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'

import schema from './schema'

import {IncomingWebhook} from '@slack/webhook'

const slackClient = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL)

const contact: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  console.info(JSON.stringify(event))

  const message = `
お名前：${event.body.name}
メールアドレス：${event.body.mail}
お問い合わせ内容：
${event.body.body}
`

  await slackClient.send({
    text: message,
  })

  return formatJSONResponse({
    event,
  })
}

export const main = middyfy(contact)

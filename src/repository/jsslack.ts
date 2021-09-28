import { WebClient, ChatPostMessageResponse } from '@slack/web-api';

export class JSSlack {
  postSlackMessage = async (channel: string, message: string): Promise<ChatPostMessageResponse> => {
    const web = new WebClient(process.env.SLACK_BOT_TOKEN);

    let response: ChatPostMessageResponse = {
      ok: false,
      channel,
      error: '',
    };

    try {
      response = await web.chat.postMessage({
        channel: `#${channel}`,
        text: message,
      });
    } catch (error) {
      response.error = JSON.stringify(error);
      Promise.reject(response);
    }

    return Promise.resolve(response);
  };
}

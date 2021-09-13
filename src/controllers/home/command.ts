import { randomInt } from 'crypto';
import { Handler } from '../../models/route';
import { postMessage } from '../../services/slack';

export const command: Handler = async (req, res) => {
  let requestor = 'Someone';
  let channel = 'general';
  if (req.body && !!req.body.user_name) {
    requestor = req.body.user_name;
  }
  if (req.body && !!req.body.channel_name) {
    channel = req.body.channel_name;
  }
  if(channel === 'privategroup') {
    channel = 'sea-tech-only';
  }
  let text = requestor;
  if (req.body && !!req.body.text) {
    text = req.body.text;
  }
  const facilitators = text.split(' ');
  const facilitator = facilitators[randomInt(facilitators.length)];
  return postMessage(
    channel,
    `:mega: ${requestor} requested a facilitator between [${text}].\n*${facilitator}* is the chosen one :tada:`,
  ).then(() => {
    res.status(200).send(`Facilitator sent to ${channel} channel.`);
  });
};

import { randomInt } from 'crypto';
import { postSlackMessage } from '../repository/slack';

export const choseFacilitator = async (requestor: string, facilitators: string[], channel: string) => {
  const facilitator = facilitators[randomInt(facilitators.length)];
  return postSlackMessage(
    channel,
    `:mega: ${requestor} requested a facilitator between [${facilitators.join(
      ',',
    )}].\n*${facilitator}* is the chosen one :tada:`,
  ).then(() => {
    return `Facilitator sent to ${channel} channel.`;
  });
};

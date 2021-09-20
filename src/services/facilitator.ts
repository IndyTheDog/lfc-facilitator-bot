import { randomInt } from 'crypto';
import { JSSlack } from '../repository/jsslack';

export const chooseFacilitator = async (requestor: string, facilitators: string[], channel: string) => {
  const getFacilitators = (inputFacilitators: string[]) => {
    if (inputFacilitators && inputFacilitators.length === 1 && !!process.env.TEAM_CONFIGURATION) {
      const teamConfiguration = JSON.parse(process.env.TEAM_CONFIGURATION);
      if (!!teamConfiguration && !!teamConfiguration.config && teamConfiguration.config[inputFacilitators[0]]) {
        return teamConfiguration.config[inputFacilitators[0]];
      }
    }

    return inputFacilitators;
  };

  const getFacilitator = (inputFacilitators: string[]) => {
    return inputFacilitators[randomInt(inputFacilitators.length)];
  };

  const allFacilitators = getFacilitators(facilitators);
  const facilitator = getFacilitator(allFacilitators);

  return new JSSlack()
    .postSlackMessage(
      channel,
      `:mega: ${requestor} requested a facilitator between [${allFacilitators.join(
        ',',
      )}].\n*${facilitator}* is the chosen one :tada:`,
    )
    .then(() => {
      return `Facilitator sent to ${channel} channel.`;
    });
};

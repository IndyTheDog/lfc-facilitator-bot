import { randomInt } from 'crypto';
import { JSSlack } from '../repository/jsslack';

export const chooseFacilitator = async (
  requestor: string,
  facilitators: string[],
  channel: string,
): Promise<string> => {
  const getFacilitators = (inputFacilitators: string[]): string[] => {
    if (inputFacilitators && inputFacilitators.length === 1 && !!process.env.TEAM_CONFIGURATION) {
      const teamConfiguration = JSON.parse(process.env.TEAM_CONFIGURATION);
      if (!!teamConfiguration && !!teamConfiguration.config && teamConfiguration.config[inputFacilitators[0]]) {
        return teamConfiguration.config[inputFacilitators[0]];
      }
    }

    return inputFacilitators;
  };

  const getFacilitator = (inputFacilitators: string[]): string => {
    if (!!inputFacilitators && inputFacilitators.length > 0) {
      return inputFacilitators[randomInt(inputFacilitators.length)];
    }
    return 'void';
  };

  const getNextFacilitators = (facilitator: string, facilitators: string[]): string[] => {
    const _facilitators = Object.assign([], facilitators);
    const indexOfFacilitator = _facilitators.indexOf(facilitator);
    if (indexOfFacilitator >= 0) {
      _facilitators.splice(indexOfFacilitator, 1);
    }
    return _facilitators;
  };

  const allFacilitators = getFacilitators(facilitators);
  const facilitator = getFacilitator(allFacilitators);
  const remainingFacilitators = getNextFacilitators(facilitator, allFacilitators);
  const backupFacilitator = getFacilitator(remainingFacilitators);
  const remainingTeamMembers = getNextFacilitators(backupFacilitator, remainingFacilitators);
  const firstSpeaker = getFacilitator(remainingTeamMembers);

  return new JSSlack()
    .postSlackMessage(
      channel,
      `:mega: ${requestor} requested a facilitator between [${allFacilitators.join(
        ',',
      )}].\n*${facilitator}* is the chosen one :tada:` +
        `\n*${backupFacilitator}* is the backup :star:` +
        `\n*${firstSpeaker}* is the first to present :loudspeaker:`,
    )
    .then(() => {
      return `Facilitator sent to ${channel} channel.`;
    });
};

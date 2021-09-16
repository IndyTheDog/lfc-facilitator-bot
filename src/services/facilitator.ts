import { randomInt } from 'crypto';
import { postSlackMessage } from '../repository/slack';

export const choseFacilitator = async (requestor: string, facilitators: string[], channel: string) => {

    const getFacilitators = (inputFacilitators: string[]) => {
        if (inputFacilitators
            && inputFacilitators[0] === 'team'
            && !!process.env.DEFAULT_TEAM) {
            return process.env.DEFAULT_TEAM.split(' ') as unknown as string[];
        }

        return inputFacilitators;
    }

    const getFacilitator = (inputFacilitators: string[]) => {
        return inputFacilitators[randomInt(inputFacilitators.length)];
    }

    const allFacilitators = getFacilitators(facilitators);
    const facilitator = getFacilitator(allFacilitators);
    return postSlackMessage(
        channel,
        `:mega: ${requestor} requested a facilitator between [${allFacilitators.join(
            ',',
        )}].\n*${facilitator}* is the chosen one :tada:`,
    ).then(() => {
        return `Facilitator sent to ${channel} channel.`;
    });
};

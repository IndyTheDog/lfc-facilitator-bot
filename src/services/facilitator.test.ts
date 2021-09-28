import { chooseFacilitator } from './facilitator';
import { randomInt } from 'crypto';
import { JSSlack } from '../repository/jsslack';
import { ChatPostMessageResponse } from '@slack/web-api';

const REQUESTOR = 'Cedric';
const CHANNEL = 'general';
const OLD_ENV = process.env;

const TEAM_CONFIGURATION = '{"config":{"team": ["John", "Joe", "Jane"],"second": ["Paul", "Poe", "Pat"]}}';

const mockPostSlackMessage = jest.fn().mockImplementation(async (channel, message) => {
  return Promise.resolve(message);
});

jest.mock('../repository/jsslack', () => {
  return {
    JSSlack: jest.fn().mockImplementation(() => {
      return {
        postSlackMessage: mockPostSlackMessage,
      };
    }),
  };
});

jest.mock('crypto', () => {
  return {
    randomInt: () => 0,
  };
});

afterAll(() => {
  jest.resetModules();
  process.env = { ...OLD_ENV };
});

beforeAll(() => {
  process.env.TEAM_CONFIGURATION = TEAM_CONFIGURATION;
});

describe('Use the configuration to choose a facilitator', () => {
  it('selects an existing configuration', async () => {
    const result = await chooseFacilitator(REQUESTOR, ['team'], CHANNEL);
    expect(mockPostSlackMessage).toHaveBeenCalledTimes(1);
    expect(mockPostSlackMessage).toHaveBeenCalledWith(
      'general',
      ':mega: Cedric requested a facilitator between [John,Joe,Jane].\n*John* is the chosen one :tada:\n*Joe* is the backup :star:\n*Jane* is the first to present :loudspeaker:',
    );
  });

  it('selects a second configuration', async () => {
    const result = await chooseFacilitator(REQUESTOR, ['second'], CHANNEL);
    expect(mockPostSlackMessage).toHaveBeenCalledTimes(2);
    expect(mockPostSlackMessage).toHaveBeenCalledWith(
      'general',
      ':mega: Cedric requested a facilitator between [Paul,Poe,Pat].\n*Paul* is the chosen one :tada:\n*Poe* is the backup :star:\n*Pat* is the first to present :loudspeaker:',
    );
  });
});

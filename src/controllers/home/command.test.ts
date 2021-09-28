import { command } from './command';
import { createDefaultMock } from '../../testUtil';
import { chooseFacilitator } from '../../services/facilitator';

jest.mock('../../services/facilitator', () => {
  return {
    chooseFacilitator: (requestor: string, facilitators: string[], channel: string) => Promise.resolve(''),
  };
});

describe('index', () => {
  it('returns index.html', async () => {
    const { mockRequest, mockResponse } = createDefaultMock();
    await command(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });
});

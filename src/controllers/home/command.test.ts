import { command } from './command';
import { createDefaultMock } from '../../testUtil';

describe('index', () => {
  it('returns index.html', () => {
    const { mockRequest, mockResponse } = createDefaultMock();
    mockResponse.sendFile = jest.fn();
    command(mockRequest, mockResponse);
    expect(mockResponse.sendFile).toHaveBeenCalledTimes(1);
  });
});

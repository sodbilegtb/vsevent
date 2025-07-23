// userModel.test.js
import { jest, describe, it, expect } from '@jest/globals';

const mockFindOne = jest.fn();

jest.unstable_mockModule('../models/User.js', () => ({
  __esModule: true,          // Use this if the module uses ESM default export
  default: {
    findOne: mockFindOne,
  }
}));

// Because jest.unstable_mockModule is async, wrap tests in async function
describe('User model unit test with mock', () => {
  it('should return a mock user from User.findOne', async () => {
    const { default: User } = await import('../models/User.js');
    const mockUser = { email: 'test@example.com', name: 'Test User' };
    mockFindOne.mockResolvedValue(mockUser);

    const result = await User.findOne({ email: 'test@example.com' });

    expect(result).toEqual(mockUser);
    expect(mockFindOne).toHaveBeenCalledWith({ email: 'test@example.com' });
  });
});

import User from '../models/User.js';

jest.mock('../models/User.js', () => ({
  findOne: jest.fn(),
}));

describe('User model unit test with mock', () => {
  it('should return a mock user from User.findOne', async () => {
    const mockUser = { email: 'test@example.com', name: 'Test User' };
    User.findOne.mockResolvedValue(mockUser);

    const result = await User.findOne({ email: 'test@example.com' });

    expect(result).toEqual(mockUser);
    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
  });
});

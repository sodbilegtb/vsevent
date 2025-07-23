import User from '../models/User.js';

export async function findUserByName(name) {
  return User.findOne({ name });
}

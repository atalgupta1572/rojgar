import User from '../../models/User.js';

export const updateProfile = async (userId, data) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  // Handle common fields
  if (data.name) user.name = data.name;
  if (data.profilePicture) user.profilePicture = data.profilePicture;
  if (data.location) user.location = data.location;

  // Handle Role specific fields
  if (user.role === 'WORKER' && data.workerProfile) {
    user.workerProfile = { ...user.workerProfile, ...data.workerProfile };
  } else if (user.role === 'CONTRACTOR' && data.contractorProfile) {
    user.contractorProfile = { ...user.contractorProfile, ...data.contractorProfile };
  }

  await user.save();
  return user;
};

export const getProfile = async (userId) => {
  const user = await User.findById(userId).select('-__v');
  if (!user) throw new Error('User not found');
  return user;
};
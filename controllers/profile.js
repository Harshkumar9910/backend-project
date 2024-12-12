import User1 from "../models/user.js";

// Fetch user details by ID
const getUserDetails = async (req, res) => {
  try {
    const userId = req.userId; // Assume req.user contains the authenticated user
    console.log("userId",userId)

    const user = await User1.findById(userId).select('-password');
console.log("user",user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export default getUserDetails;
// In your controller (profile.js)
export const updateprofile = async (req, res) => {
    try {
      const userId = req.userId; // Get user ID from token or session
      const updatedData = req.body; // Get the updated user data from the request body
  
      const user = await User1.findByIdAndUpdate(userId, updatedData, { new: true });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user); // Send back the updated user data
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
}
};

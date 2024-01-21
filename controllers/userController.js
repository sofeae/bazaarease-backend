const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    const obj = {
      id: user._id,
      email,
      token,
      businessName: user.businessName,
      storeStatus: user.storeStatus // Include storeStatus in the response
    };

    res.status(200).json(obj);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { email, password, businessName } = req.body;

  try {
    const user = await User.signup(email, password, businessName);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({
      email,
      token,
      storeStatus: user.storeStatus // Include storeStatus in the response
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update store status
const updateStoreStatus = async (req, res) => {
  const { newStatus } = req.body;
  const userId = req.user._id
  try {
    // Assuming you have a User model with a findByIdAndUpdate method
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { storeStatus: newStatus } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Store status updated successfully", storeStatus: updatedUser.storeStatus });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
  

// Sample controller function for getStoreStatus
// const getStoreStatus = async (req, res) => {
//   try {
//     // Assuming you have a User model with a storeStatus field
//     const user = await User.findById(req.user._id);

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const storeStatus = user.storeStatus;

//     res.status(200).json({ storeStatus });
//   } catch (error) {
//     console.error('Error fetching store status:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// get a single status
const getStoreStatus = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "User not found" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "Error" });
  }

  res.status(200).json({storeStatus:user.storeStatus});
};

// Export your controller functions
module.exports = {
  loginUser,
  signupUser,
  updateStoreStatus,
  getStoreStatus,
};

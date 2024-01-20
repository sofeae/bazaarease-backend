const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

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

module.exports = { signupUser, loginUser };

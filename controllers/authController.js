// Models
const User = require("../models/User");

// Utils
const generateToken = require("../utils/generateToken");
const crypto = require("crypto");
const sendMail = require("../utils/sendMail");

// @desc    Register akun
// @route   POST /auth/register
// @access  Public
const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Field request tidak lengkap",
    });
  }

  try {
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return res.status(400).json({
        success: false,
        message: "Email sudah terdaftar!",
      });
    }

    const verifyToken = crypto.randomBytes(32).toString("hex");
    const verifyTokenExpires = Date.now() + 1000 * 60 * 60 * 24; // 24 hours

    const newUser = await User.create({
      name,
      email,
      password,
      verifyToken,
      verifyTokenExpires,
      authType: "local",
    });

    // Generate verification URL
    const verifyUrl = `http://${process.env.CLIENT_URL}/verify/${verifyToken}`;

    // Create HTML content
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification - LearnTUbe</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 20px;
          }
          .header {
            text-align: center;
            background-color: #007BFF;
            color: #ffffff;
            padding: 20px;
            border-radius: 8px 8px 0 0;
          }
          .header h1 {
            margin: 0;
          }
          .content {
            padding: 20px;
            font-size: 16px;
            line-height: 1.6;
          }
          .content p {
            margin-bottom: 20px;
          }
          .content a {
            display: inline-block;
            background-color: #007BFF;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            font-weight: bold;
            border-radius: 5px;
          }
          .footer {
            text-align: center;
            padding: 20px;
            font-size: 14px;
            color: #888888;
            border-top: 1px solid #e0e0e0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>LearnTUbe</h1>
          </div>
          <div class="content">
            <p>Hello ${name},</p>
            <p>Thank you for signing up at LearnTUbe! To complete your registration, please click the button below to verify your email address.</p>
            <p>This verification link is only valid for 24 hours. Don’t miss the opportunity to activate your account!</p>
            <p><a href="${verifyUrl}">Verify Your Email</a></p>
            <p>If you didn’t sign up for an account at LearnTUbe, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>Best regards,</p>
            <p>The LearnTUbe Team</p>
            <p>If you have any questions, feel free to contact us at <a href="mailto:support@learntube.com">support@learntube.com</a>.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email
    await sendMail(
      email,
      "Email Verification - LearnTUbe",
      htmlContent
    );

    res.status(201).json({
      success: true,
      message: "User created successfully. Please check your email for verification.",
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};


// @desc    Login akun
// @route   POST /auth/login
// @access  Public
const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email/password salah",
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Email/password salah",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Akun belum ter-approve",
      });
    }

    const token = generateToken(user);

    // Simpan token di cookie (ga lewat response, nanti FE akses cookie nya)
    res.json({
      success: true,
      message: "Login berhasil",
      // buat di development aja
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        isVerified: user.isVerified,
        authType: user.authType,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user profile
// @route   GET /auth/profile
// @access  Private
const getProfile = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan data user",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Verify user email
// @route   GET /auth/verify/:token
// @access  Public
const verifyEmail = async (req, res, next) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Token tidak valid atau sudah expired.",
      });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpires = undefined;
    await user.save();

    res.json({
      success: true,
      message: "Email berhasil diverifikasi.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getProfile, verifyEmail };

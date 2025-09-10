// routes/auth.js
const express = require("express");
const passport = require("passport");
const {
  register,
  login,
  getProfile,
  verifyEmail,
} = require("../controllers/authController");
const { isLoggedIn } = require("../middleware/authMiddleware");
const { authLimiter } = require("../middleware/limiterMiddleware")

const router = express.Router();

/**
 * @route   POST /auth/register
 * @desc    Register akun baru dan kirim email verifikasi
 * @access  Public
 */
router.post("/register", authLimiter, register);

/**
 * @route   POST /auth/login
 * @desc    Login user menggunakan email dan password
 * @access  Public
 */
router.post("/login", authLimiter, login);

/**
 * @route   GET /auth/profile
 * @desc    Mendapatkan data profil user yang sedang login
 * @access  Private
 */
router.get("/profile", isLoggedIn, getProfile);

/**
 * @route   GET /auth/verify/:token
 * @desc    Verifikasi email user berdasarkan token
 * @access  Public
 */
router.get("/verify/:token", verifyEmail);

module.exports = router;

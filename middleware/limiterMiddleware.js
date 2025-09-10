const rateLimit = require('express-rate-limit');

// Rate Limiter untuk rute-rute tertentu
const youtubeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 10, // Maksimum 10 permintaan ke YouTube API per 15 menit
  message: {
    success: false,
    error: {
      code: 429,
      message: 'Too many requests to YouTube API, please try again later.',
      details: 'You have exceeded the allowed number of requests within the time window.',
      retry_after: '15 minutes',
    },
  },
});

// Rate Limiter untuk login, register
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 800, // Maksimum 5 permintaan login/register per 15 menit
  message: {
    success: false,
    error: {
      code: 429,
      message: 'Too many login attempts, please try again later.',
    },
  },
});

module.exports = { youtubeLimiter, authLimiter };
const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/authMiddleware');
const { checkPlaylistOwner } = require('../middleware/playlistOwnerMiddleware');
const { youtubeLimiter } = require("../middleware/limiterMiddleware")

const {
  createPlaylist,
  addVideoToRoadmap,
  updateVideoProgress,
  getUserPlaylists,
  createRoadmap,
  getRoadmap,
  updateRoadmap,
  deleteRoadmap,
  searchVideos,
  getRoadmapDetail,
  deleteVideoFromRoadmap,
  updatePlaylist,  
  deletePlaylist,
} = require('../controllers/playlistController');

// Route untuk membuat playlist
router.post('/create', isLoggedIn, createPlaylist);

// Route untuk mencari video dari YouTube
router.get('/search', isLoggedIn, youtubeLimiter, searchVideos);

// Route untuk membuat roadmap baru (hanya pemilik playlist atau admin)
router.post('/create-roadmap/:playlistId', isLoggedIn, checkPlaylistOwner, createRoadmap);

// Route untuk mengambil semua roadmap dari playlist (public)
router.get('/roadmap/:playlistId', isLoggedIn, checkPlaylistOwner, getRoadmap);

// Route untuk mengambil detail roadmap tertentu
router.get('/roadmap/:playlistId/:roadmapId', isLoggedIn, getRoadmapDetail);

// Route untuk mengupdate roadmap (hanya pemilik playlist atau admin)
router.put('/update-roadmap/:playlistId/:roadmapId', isLoggedIn, checkPlaylistOwner, updateRoadmap);

// Route untuk menghapus roadmap berdasarkan `roadmapId` (hanya pemilik playlist atau admin)
router.delete('/delete-roadmap/:playlistId/:roadmapId', isLoggedIn, checkPlaylistOwner, deleteRoadmap);

// Route untuk menambahkan video ke roadmap (hanya pemilik playlist atau admin)
router.post('/add-video/:playlistId/:roadmapId', isLoggedIn, checkPlaylistOwner, addVideoToRoadmap);

// Route untuk mengupdate progress video
router.put('/update-progress/:playlistId/:roadmapId', isLoggedIn, checkPlaylistOwner, updateVideoProgress);

// Route untuk menghapus video dari roadmap (hanya pemilik playlist atau admin)
router.delete('/delete-video/:playlistId/:roadmapId/:videoId', isLoggedIn, checkPlaylistOwner, deleteVideoFromRoadmap);

// Route untuk mendapatkan playlist user
router.get('/user', isLoggedIn, getUserPlaylists);

// Route untuk mengupdate playlist (hanya pemilik playlist atau admin)
router.put('/update-playlist/:playlistId', isLoggedIn, checkPlaylistOwner, updatePlaylist);  

// Route untuk menghapus playlist (hanya pemilik playlist atau admin)
router.delete('/delete-playlist/:playlistId', isLoggedIn, checkPlaylistOwner, deletePlaylist);  


module.exports = router;

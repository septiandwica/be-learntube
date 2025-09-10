const Playlist = require('../models/Playlist');

// Middleware untuk memeriksa apakah pengguna adalah pemilik playlist
const checkPlaylistOwner = async (req, res, next) => {
  const { playlistId } = req.params; // Mendapatkan playlistId dari parameter

  try {
    // Mencari playlist berdasarkan ID
    const playlist = await Playlist.findById(playlistId);

    // Pastikan playlist ditemukan
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    // Memeriksa apakah user yang sedang login adalah pemilik playlist
    if (playlist.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to modify this playlist',
      });
    }

    // Jika pemilik playlist atau admin, lanjutkan ke route handler berikutnya
    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { checkPlaylistOwner };
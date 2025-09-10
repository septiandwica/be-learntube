// Validasi untuk membuat Playlist
const validatePlaylist = (req, res, next) => {
  const { title } = req.body;

  // Validasi title playlist
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ message: 'Title is required and must be a non-empty string.' });
  }

  next();
};

// Validasi untuk menambahkan Video ke Roadmap
const validateAddVideo = (req, res, next) => {
  const { playlistId, roadmapTitle, videoData } = req.body;

  // Validasi playlistId
  if (!playlistId || typeof playlistId !== 'string') {
    return res.status(400).json({ message: 'Playlist ID is required and must be a valid string.' });
  }

  // Validasi roadmapTitle
  if (!roadmapTitle || typeof roadmapTitle !== 'string' || roadmapTitle.trim() === '') {
    return res.status(400).json({ message: 'Roadmap title is required and must be a valid string.' });
  }

  // Validasi videoData (periksa apakah videoData adalah objek yang valid)
  if (!videoData || typeof videoData !== 'object') {
    return res.status(400).json({ message: 'Video data is required and must be a valid object.' });
  }

  const { videoId, videoTitle, videoUrl } = videoData;

  // Validasi videoId, videoTitle, videoUrl
  if (!videoId || !videoTitle || !videoUrl) {
    return res.status(400).json({ message: 'Each video must have a valid ID, title, and URL.' });
  }

  if (typeof videoId !== 'string' || typeof videoTitle !== 'string' || typeof videoUrl !== 'string') {
    return res.status(400).json({ message: 'Video ID, title, and URL must all be strings.' });
  }

  next();
};

// Validasi untuk update progress video
const validateUpdateProgress = (req, res, next) => {
  const { progress } = req.body;

  // Validasi status progress
  if (!progress || !['In Progress', 'Completed'].includes(progress)) {
    return res.status(400).json({ message: 'Progress must be either "In Progress" or "Completed".' });
  }

  next();
};

module.exports = { validatePlaylist, validateAddVideo, validateUpdateProgress };

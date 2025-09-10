const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true, 
      trim: true 
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    roadmap: [
      {
        title: { type: String, required: true }, // Misalnya: "Beginner", "Intermediate", dll.
        videos: [
          {
            videoId: { type: String, required: true }, // ID YouTube Video
            videoTitle: { type: String, required: true }, // Judul Video
            videoUrl: { type: String, required: true }, // URL YouTube
            thumbnailUrl: { type: String, required: true },
            progress: {
              type: String,
              enum: ['To Do', 'In Progress', 'Completed'],
              default: 'To Do', 
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Playlist', playlistSchema);

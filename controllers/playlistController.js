const Playlist = require("../models/Playlist");
const User = require("../models/User");
const youtubeService = require("../services/youtubeService");

exports.createPlaylist = async (req, res) => {
  const { title } = req.body;

  try {
    const user = await User.findById(req.user.id); // Ambil user yang sedang login
    if (user.playlists.length >= 10) {
      return res
        .status(400)
        .json({ message: "You can create a maximum of 10 playlists." });
    }

    const newPlaylist = new Playlist({
      title,
      user: req.user.id,
    });

    await newPlaylist.save();
    user.playlists.push(newPlaylist);
    await user.save();

    res.status(201).json(newPlaylist);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating playlist", error: err.message });
  }
};

exports.createRoadmap = async (req, res) => {
  const { playlistId } = req.params; // Mengambil playlistId dari URL parameter
  const { title } = req.body;

  try {
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist tidak ditemukan" });
    }

    // Pastikan roadmap belum ada dengan title yang sama
    const existingRoadmap = playlist.roadmap.find((r) => r.title === title);
    if (existingRoadmap) {
      return res
        .status(400)
        .json({ message: "Roadmap with this title already exists" });
    }

    // Membuat roadmap baru
    const newRoadmap = {
      title,
      videos: [], // Roadmap baru tidak ada video terlebih dahulu
    };

    // Menambahkan roadmap ke dalam playlist
    playlist.roadmap.push(newRoadmap);

    // Menyimpan perubahan pada playlist
    await playlist.save();

    // Mengembalikan roadmap yang baru saja dibuat
    res.status(201).json(newRoadmap);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating roadmap", error: err.message });
  }
};

exports.getRoadmap = async (req, res) => {
  const { playlistId } = req.params;

  try {
    // Mencari playlist berdasarkan ID
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist tidak ditemukan" });
    }

    // Mengembalikan semua roadmap yang ada dalam playlist
    res.status(200).json(playlist.roadmap);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching roadmap", error: err.message });
  }
};

exports.getRoadmapDetail = async (req, res) => {
  const { playlistId, roadmapId } = req.params;

  try {
    // Mencari playlist berdasarkan ID
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist tidak ditemukan" });
    }

    // Mencari roadmap berdasarkan ID atau title
    const roadmap = playlist.roadmap.find(
      (r) => r._id.toString() === roadmapId
    );
    if (!roadmap) {
      return res.status(404).json({ message: "Roadmap tidak ditemukan" });
    }

    // Mengembalikan roadmap yang ditemukan
    res.status(200).json(roadmap);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching roadmap detail", error: err.message });
  }
};
exports.updateRoadmap = async (req, res) => {
  const { playlistId, roadmapId } = req.params; 
  const { title } = req.body; 

  // Validate input
  if (!title || !roadmapId || !playlistId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Find the playlist by ID
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    // Find the roadmap by ID
    const roadmap = playlist.roadmap.find((r) => r.id === roadmapId);
    if (!roadmap) {
      return res.status(404).json({ message: "Roadmap not found" });
    }

    // Update the roadmap title
    roadmap.title = title;
    await playlist.save(); // Save changes to the database

    res.status(200).json({
      message: "Roadmap updated successfully",
      roadmap,
    });
  } catch (err) {
    console.error("Error updating roadmap:", err); // Add error logging
    res.status(500).json({ message: "Error updating roadmap", error: err.message });
  }
};
exports.deleteRoadmap = async (req, res) => {
  const { playlistId, roadmapId } = req.params;

  try {
    // Mencari playlist berdasarkan ID
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist tidak ditemukan" });
    }

    // Mencari roadmap berdasarkan ID
    const roadmapIndex = playlist.roadmap.findIndex(
      (r) => r._id.toString() === roadmapId
    );
    if (roadmapIndex === -1) {
      return res.status(404).json({ message: "Roadmap tidak ditemukan" });
    }

    // Menghapus roadmap dari array roadmap
    playlist.roadmap.splice(roadmapIndex, 1);

    // Menyimpan perubahan pada playlist
    await playlist.save();

    res.status(200).json({ message: "Roadmap berhasil dihapus" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting roadmap", error: err.message });
  }
};

exports.updatePlaylist = async (req, res) => {
  const { playlistId } = req.params; // Mengambil playlistId dari URL parameter
  const { title } = req.body; // Mengambil judul baru dari body request

  try {
    // Mencari playlist berdasarkan ID
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist tidak ditemukan" });
    }

    // Mengupdate judul playlist
    playlist.title = title;
    await playlist.save();

    res.status(200).json({ message: "Playlist berhasil diperbarui", playlist });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating playlist", error: err.message });
  }
};

exports.deletePlaylist = async (req, res) => {
  const { playlistId } = req.params;

  try {
    // Using findByIdAndDelete instead of remove
    const playlist = await Playlist.findByIdAndDelete(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    res.status(200).json({ message: 'Playlist deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting playlist', error: err.message });
  }
};


exports.searchVideos = async (req, res) => {
  const { q } = req.query; // Query pencarian dari parameter

  // Validasi query pencarian
  if (!q) {
    return res.status(400).json({
      success: false,
      message: "Query pencarian diperlukan",
    });
  }

  try {
    // Mencari video di YouTube
    const videos = await youtubeService.searchVideos(q);

    // Format hasil video
    const formattedVideos = videos.map((video) => ({
      videoId: video.videoId,
      videoTitle: video.videoTitle,
      description: video.videoDescription || "No description available.",
      thumbnailUrl: video.thumbnailUrl,
      channelTitle: video.channelTitle,
      publishedAt: video.publishedAt,
      videoUrl: `https://www.youtube.com/watch?v=${video.videoId}`, 
    }));

    // Response dengan data video yang ditemukan
    res.json({
      success: true,
      message: "Berhasil mendapatkan video",
      data: formattedVideos,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data dari YouTube",
      error: err.message,
    });
  }
};

// controllers/playlistController.js
exports.addVideoToRoadmap = async (req, res) => {
  const { playlistId, roadmapId } = req.params;
  const { videoData } = req.body;

  try {
    // Mencari playlist berdasarkan ID
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist tidak ditemukan" });
    }

    // Mencari roadmap berdasarkan ID
    const roadmap = playlist.roadmap.find(
      (r) => r._id.toString() === roadmapId
    );
    if (!roadmap) {
      return res.status(404).json({ message: "Roadmap tidak ditemukan" });
    }

    // Pastikan jumlah video tidak lebih dari 3
    if (roadmap.videos.length >= 3) {
      return res
        .status(400)
        .json({
          message: "Satu roadmap hanya boleh memiliki maksimal 3 video",
        });
    }

    // Menambahkan video ke roadmap dengan status 'To Do'
    roadmap.videos.push({
      videoId: videoData.videoId,
      videoTitle: videoData.videoTitle,
      videoUrl: videoData.videoUrl,
      thumbnailUrl: videoData.thumbnailUrl,
      progress: "To Do",
    });

    // Menyimpan perubahan pada playlist
    await playlist.save();

    res.status(200).json(roadmap);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding video to roadmap", error: err.message });
  }
};
exports.getVideoFromRoadmap = async (req, res) => {
  const { playlistId, roadmapTitle, videoId } = req.params;

  try {
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist tidak ditemukan" });
    }

    const roadmap = playlist.roadmap.find((r) => r.title === roadmapTitle);
    if (!roadmap) {
      return res.status(404).json({ message: "Roadmap not found" });
    }

    const video = roadmap.videos.find((v) => v.videoId === videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json(video);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching video", error: err.message });
  }
};
exports.deleteVideoFromRoadmap = async (req, res) => {
  const { playlistId, roadmapId, videoId } = req.params; // Getting playlistId, roadmapId, and videoId from URL params
  try {
    // Find the playlist by ID
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist tidak ditemukan" });
    }

    // Find the roadmap by roadmapId
    const roadmap = playlist.roadmap.find(
      (r) => r._id.toString() === roadmapId
    );
    if (!roadmap) {
      return res.status(404).json({ message: "Roadmap tidak ditemukan" });
    }

    // Find the video by videoId
    const videoIndex = roadmap.videos.findIndex((v) => v.videoId === videoId);
    if (videoIndex === -1) {
      return res
        .status(404)
        .json({ message: "Video tidak ditemukan di roadmap" });
    }

    // Remove the video from the roadmap
    roadmap.videos.splice(videoIndex, 1);
    await playlist.save();

    res.status(200).json({ message: "Video berhasil dihapus dari roadmap" });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Error deleting video from roadmap",
        error: err.message,
      });
  }
};

exports.updateVideoProgress = async (req, res) => {
  const { playlistId, roadmapId } = req.params; // Mengambil playlistId dan roadmapId dari URL
  const { videoId, progress } = req.body; // Mengambil videoId dan progress baru dari body request

  try {
    // Mencari playlist berdasarkan ID
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist tidak ditemukan" });
    }

    // Mencari roadmap berdasarkan roadmapId di dalam playlist
    const roadmap = playlist.roadmap.find(
      (r) => r._id.toString() === roadmapId
    );
    if (!roadmap) {
      return res.status(404).json({ message: "Roadmap tidak ditemukan" });
    }

    // Mencari video berdasarkan videoId dalam roadmap
    const video = roadmap.videos.find((v) => v.videoId === videoId);
    if (!video) {
      return res
        .status(404)
        .json({ message: "Video tidak ditemukan di roadmap" });
    }

    // Update status progress video sesuai yang diberikan
    video.progress = progress;

    // Menghitung total video untuk setiap status
    const totalToDo = roadmap.videos.filter(
      (v) => v.progress === "To Do"
    ).length;
    const totalInProgress = roadmap.videos.filter(
      (v) => v.progress === "In Progress"
    ).length;
    const totalCompleted = roadmap.videos.filter(
      (v) => v.progress === "Completed"
    ).length;

    // Menyimpan perubahan pada playlist
    await playlist.save();

    // Mengembalikan video dengan status progress yang baru dan total status video
    res.status(200).json({
      video,
      total: {
        toDo: totalToDo,
        inProgress: totalInProgress,
        completed: totalCompleted,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating progress", error: err.message });
  }
};

exports.getUserPlaylists = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("playlists");
    res.status(200).json(user.playlists);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching playlists", error: err.message });
  }
};

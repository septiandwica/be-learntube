// services/youtubeService.js
const axios = require('axios');
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// Fungsi untuk mencari video berdasarkan query
exports.searchVideos = async (query) => {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        maxResults: 10,
        q: query,
        type: 'video',  // Menambahkan 'type' untuk memastikan hanya video yang dikembalikan
        key: YOUTUBE_API_KEY,
      },
    });

    // Filter hanya video yang memiliki videoId
    const filteredVideos = response.data.items.filter(item => item.id.kind === 'youtube#video');

    return filteredVideos.map((item) => ({
      videoId: item.id.videoId,
      videoTitle: item.snippet.title,
      videoDescription: item.snippet.description || "No description available.",
      thumbnailUrl: item.snippet.thumbnails.high.url,
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
    }));
  } catch (err) {
    throw new Error('Error fetching videos from YouTube API');
  }
};

// Fungsi untuk mendapatkan detail video berdasarkan videoId
exports.getVideoDetails = async (videoId) => {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        part: 'snippet',
        id: videoId,
        key: YOUTUBE_API_KEY,
      },
    });

    const video = response.data.items[0];
    
    if (!video) {
      return null;
    }

    return {
      videoId: video.id,
      videoTitle: video.snippet.title,
      videoUrl: `https://www.youtube.com/watch?v=${video.id}`,
    };
  } catch (err) {
    throw new Error('Error fetching video details from YouTube API');
  }
};

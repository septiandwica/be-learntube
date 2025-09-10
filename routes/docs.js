const express = require("express");
const router = express.Router();

/**
 * @route   GET /
 * @desc    API Documentation Page
 * @access  Public
 */
router.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>LearnTube API Docs</title>
        <style>
          body { font-family: sans-serif; padding: 2rem; background: #f9f9f9; color: #333; }
          h1 { color: #4f46e5; }
          code { background: #eee; padding: 2px 6px; border-radius: 4px; }
          .endpoint { margin-bottom: 2rem; padding: 1rem; background: #fff; border-left: 4px solid #4f46e5; box-shadow: 0 0 3px rgba(0,0,0,0.1); }
          pre { background: #f1f1f1; padding: 1rem; overflow-x: auto; }
        </style>
      </head>
      <body>
        <h1>📘 LearnTube API Documentation</h1>

        <h2>🔐 Auth Routes</h2>

        <div class="endpoint">
          <h3>POST /auth/register</h3>
          <p>Register a new user</p>
          <strong>Request Body:</strong>
          <pre>{
  "name": "Budi",
  "email": "budi@example.com",
  "password": "password123"
}</pre>
          <strong>Response:</strong>
          <pre>{
  "success": true,
  "message": "User created successfully. Please check your email for verification.",
  "user": {
    "id": "xxx",
    "email": "budi@example.com",
    "name": "Budi",
    "role": "user"
  }
}</pre>
        </div>

        <div class="endpoint">
          <h3>POST /auth/login</h3>
          <p>Login and get a JWT token</p>
          <strong>Request Body:</strong>
          <pre>{
  "email": "budi@example.com",
  "password": "password123"
}</pre>
          <strong>Response:</strong>
          <pre>{
  "success": true,
  "message": "Login successful",
  "token": "jwt-token",
  "user": {
    "id": "xxx",
    "email": "budi@example.com",
    "name": "Budi",
    "role": "user",
    "isVerified": "true",
    "authType": "local",
    "avatar": ""
  }
}</pre>
        </div>

        <div class="endpoint">
          <h3>GET /auth/profile</h3>
          <p>Get the profile of the logged-in user</p>
          <strong>Headers:</strong>
          <pre>Authorization: Bearer &lt;token&gt;</pre>
          <strong>Response:</strong>
          <pre>{
  "success": true,
  "user": {
    "id": "xxx",
    "name": "Budi",
    "email": "budi@example.com",
    "role": "user"
  }
}</pre>
        </div>

        <div class="endpoint">
          <h3>GET /auth/verify/:token</h3>
          <p>Verify email from token</p>
          <strong>Response:</strong>
          <pre>{
  "success": true,
  "message": "Email successfully verified."
}</pre>
        </div>

        <h2>👥 User Routes</h2>

        <div class="endpoint">
          <h3>GET /users</h3>
          <p>Get all users (Admin only)</p>
          <strong>Headers:</strong>
          <pre>Authorization: Bearer &lt;admin_token&gt;</pre>
          <strong>Response:</strong>
          <pre>{
  "success": true,
  "users": [
    {
      "id": "xxx",
      "name": "Budi",
      "email": "budi@example.com",
      "role": "user"
    }
  ]
}</pre>
        </div>

        <div class="endpoint">
          <h3>GET /users/:id</h3>
          <p>Get user details (Admin or the user themselves)</p>
          <strong>Headers:</strong>
          <pre>Authorization: Bearer &lt;token&gt;</pre>
          <strong>Response:</strong>
          <pre>{
  "success": true,
  "user": {
    "id": "xxx",
    "name": "Budi",
    "email": "budi@example.com",
    "role": "user"
  }
}</pre>
        </div>

        <div class="endpoint">
          <h3>PUT /users/:id</h3>
          <p>Update user (Admin or the user themselves)</p>
          <strong>Headers:</strong>
          <pre>Authorization: Bearer &lt;token&gt;</pre>
          <strong>Request Body:</strong>
          <pre>{
  "name": "Budi Update",
  "email": "budi@baru.com"
}</pre>
          <strong>Response:</strong>
          <pre>{
  "success": true,
  "message": "User updated successfully",
  "user": {
    "id": "xxx",
    "name": "Budi Update",
    "email": "budi@baru.com",
    "role": "user"
  }
}</pre>
        </div>

        <div class="endpoint">
          <h3>DELETE /users/:id</h3>
          <p>Delete user (Admin only)</p>
          <strong>Headers:</strong>
          <pre>Authorization: Bearer &lt;admin_token&gt;</pre>
          <strong>Response:</strong>
          <pre>{
  "success": true,
  "message": "User deleted successfully"
}</pre>
        </div>

        <h2>📚 Playlist Routes</h2>

        <div class="endpoint">
          <h3>POST /playlist/create</h3>
          <p>Create a new playlist (Max 10 playlists per user)</p>
          <strong>Headers:</strong>
          <pre>Authorization: Bearer &lt;token&gt;</pre>
          <strong>Request Body:</strong>
          <pre>{
  "title": "JavaScript Learning Path"
}</pre>
          <strong>Response:</strong>
          <pre>{
  "success": true,
  "message": "Playlist created successfully",
  "playlist": {
    "id": "xxx",
    "title": "JavaScript Learning Path",
    "owner": "user_id",
    "roadmaps": []
  }
}</pre>
        </div>

        <div class="endpoint">
          <h3>GET /playlist/user</h3>
          <p>Get all playlists of the user</p>
          <strong>Headers:</strong>
          <pre>Authorization: Bearer &lt;token&gt;</pre>
          <strong>Response:</strong>
          <pre>{
  "success": true,
  "playlists": [
    {
      "id": "xxx",
      "title": "JavaScript Learning Path",
      "owner": "user_id",
      "roadmaps": []
    }
  ]
}</pre>
        </div>

        <div class="endpoint">
          <h3>PUT /playlist/update-playlist/:playlistId</h3>
          <p>Update playlist (Owner or Admin only)</p>
          <strong>Headers:</strong>
          <pre>Authorization: Bearer &lt;token&gt;</pre>
          <strong>Request Body:</strong>
          <pre>{
  "title": "Updated JavaScript Learning Path"
}</pre>
          <strong>Response:</strong>
          <pre>{
  "success": true,
  "message": "Playlist updated successfully",
  "playlist": {
    "id": "xxx",
    "title": "Updated JavaScript Learning Path",
    "owner": "user_id"
  }
}</pre>
        </div>

        <div class="endpoint">
          <h3>DELETE /playlist/delete-playlist/:playlistId</h3>
          <p>Delete playlist (Owner or Admin only)</p>
          <strong>Headers:</strong>
          <pre>Authorization: Bearer &lt;token&gt;</pre>
          <strong>Response:</strong>
          <pre>{
  "success": true,
  "message": "Playlist deleted successfully"
}</pre>
        </div>

        <h2>🛣️ Roadmap Routes</h2>

        <div class="endpoint">
          <h3>POST /playlist/create-roadmap/:playlistId</h3>
          <p>Create a new roadmap in a playlist (Owner or Admin only)</p>
          <strong>Headers:</strong>
          <pre>Authorization: Bearer &lt;token&gt;</pre>
          <strong>Request Body:</strong>
          <pre>{
  "title": "Beginner"
}</pre>
          <strong>Response:</strong>
          <pre>{
  "success": true,
  "message": "Roadmap created successfully",
  "roadmap": {
    "id": "xxx",
    "title": "Beginner",
    "videos": []
  }
}</pre>
        </div>

        <div class="endpoint">
          <h3>GET /playlist/roadmap/:playlistId</h3>
          <p>Get all roadmaps in a playlist</p>
          <strong>Headers:</strong>
          <pre>Authorization: Bearer &lt;token&gt;</pre>
          <strong>Response:</strong>
          <pre>{
  "success": true,
  "roadmaps": [
    {
      "id": "xxx",
      "title": "Beginner",
      "videos": []
    }
  ]
}</pre>
        </div>

        <div class="endpoint">
          <h3>GET /playlist/roadmap/:playlistId/:roadmapId</h3>
          <p>Get a specific roadmap detail</p>
          <strong>Headers:</strong>
          <pre>Authorization: Bearer &lt;token&gt;</pre>
          <strong>Response:</strong>
          <pre>{
  "success": true,
  "roadmap": {
    "id": "xxx",
    "title": "Beginner",
    "videos": [
      {
        "videoId": "xyz123",
        "title": "JavaScript Tutorial for Beginners",
        "url": "https://youtube.com/watch?v=xyz123",
        "progress": "Not Started"
      }
    ]
  }
}</pre>
        </div>

        <div class="endpoint">
          <h3>PUT /playlist/update-roadmap/:playlistId/:roadmapId</h3>
          <p>Update roadmap (Owner or Admin only)</p>
          <strong>Headers:</strong>
          <pre>Authorization: Bearer &lt;token&gt;</pre>
          <strong>Request Body:</strong>
          <pre>{
  "newTitle": "Beginner Level"
}</pre>
          <strong>Response:</strong>
          <pre>{
  "success": true,
  "message": "Roadmap updated successfully",
  "roadmap": {
    "id": "xxx",
    "title": "Beginner Level",
    "videos": []
  }
}</pre>
        </div>

        <div class="endpoint">
          <h3>DELETE /playlist/delete-roadmap/:playlistId/:roadmapId</h3>
          <p>Delete roadmap (Owner or Admin only)</p>
          <strong>Headers:</strong>
          <pre>Authorization: Bearer &lt;token&gt;</pre>
          <strong>Response:</strong>
          <pre>{
  "success": true,
  "message": "Roadmap deleted successfully"
}</pre>
        </div>

        <h2>🎬 Video Routes</h2>

        <div class="endpoint">
          <h3>GET /playlist/search</h3>
          <p>Search for videos from the YouTube API</p>
          <strong>Headers:</strong>
          <pre>Authorization: Bearer &lt;token&gt;</pre>
          <strong>Query Parameters:</strong>
          <pre>q=javascript // search query</pre>
          <strong>Response:</strong>
          <pre>{
  "success": true,
  "videos": [
    {
      "videoId": "xyz123",
      "title": "JavaScript Tutorial for Beginners",
      "description": "Learn JavaScript from scratch",
      "thumbnail": "https://i.ytimg.com/vi/xyz123/default.jpg",
      "channelTitle": "Coding Channel",
      "publishedAt": "2023-01-01T00:00:00Z"
    }
  ]
}</pre>
        </div>

        <div class="endpoint">
          <h3>POST /playlist/add-video/:playlistId/:roadmapId</h3>
          <p>Add a video to a roadmap (Max 3 videos per roadmap)</p>
          <strong>Headers:</strong>
          <pre>Authorization: Bearer &lt;token&gt;</pre>
          <strong>Request Body:</strong>
          <pre>{
  "videoData": {
    "videoId": "xyz123",
    "videoTitle": "JavaScript Tutorial for Beginners",
    "videoUrl": "https://youtube.com/watch?v=xyz123"
  }
}</pre>
          <strong>Response:</strong>
          <pre>{
  "success": true,
  "message": "Video added successfully",
  "video": {
    "videoId": "xyz123",
    "title": "JavaScript Tutorial for Beginners",
    "url": "https://youtube.com/watch?v=xyz123",
    "progress": "Not Started"
  }
}</pre>
        </div>

        <div class="endpoint">
          <h3>PUT /playlist/update-progress/:playlistId/:roadmapId</h3>
          <p>Update video progress (In Progress/Completed)</p>
          <strong>Headers:</strong>
          <pre>Authorization: Bearer &lt;token&gt;</pre>
          <strong>Request Body:</strong>
          <pre>{
  "videoId": "xyz123",
  "progress": "Completed"
}</pre>
          <strong>Response:</strong>
          <pre>{
  "success": true,
  "message": "Video progress updated successfully",
  "video": {
    "videoId": "xyz123",
    "progress": "Completed"
  }
}</pre>
        </div>

        <div class="endpoint">
          <h3>DELETE /playlist/delete-video/:playlistId/:roadmapId/:videoId</h3>
          <p>Delete video from roadmap</p>
          <strong>Headers:</strong>
          <pre>Authorization: Bearer &lt;token&gt;</pre>
          <strong>Response:</strong>
          <pre>{
  "success": true,
  "message": "Video deleted successfully"
}</pre>
        </div>

        <h2>🔜 Coming Soon Features</h2>
        <p>The following features are planned for future implementation:</p>
        <ul>
          <li>Video/Audio transcription</li>
          <li>AI-powered Q&A from transcripts</li>
          <li>Quiz generation</li>
          <li>PDF export</li>
        </ul>

        <hr />
        <p><em>All responses are sent in JSON format.</em></p>
      </body>
    </html>
  `);
});

module.exports = router;

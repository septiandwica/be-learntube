# 📚 LearnTube API

LearnTube is a learning platform that enables users to create learning paths using YouTube videos. This platform allows users to organize educational videos in a structured roadmap.

## 🌟 Key Features

- 👥 Autentikasi pengguna dengan email dan password
- ✉️ Verifikasi email untuk akun baru
- 📝 Manajemen playlist pembelajaran
- 🛣️ Pembuatan roadmap pembelajaran bertingkat
- 🎥 Integrasi dengan YouTube API untuk pencarian video
- 📊 Progress tracking untuk setiap video pembelajaran
- 👮 Role-based access control (Admin/User)

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB dengan Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: Nodemailer
- **API Integration**: YouTube Data API v3
- **Rate Limiting**: express-rate-limit
- **Validation**: express-validator

## 📋 Prerequisites

Before running the application, make sure you have:

- Node.js (v14 or newer)
- MongoDB (v4.4 or newer)
- YouTube Data API key
- SMTP server for email delivery

## ⚙️ Environment Variables

Create a `.env` file in the root folder and fill it with the following variables:

\`\`\`env

# Server Configuration

PORT=2025
NODE_ENV=development

# MongoDB Configuration

MONGODB_URI=mongodb://localhost:27017/learnhub

# JWT Configuration

JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Email Configuration

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# YouTube API Configuration

YOUTUBE_API_KEY=your_youtube_api_key
\`\`\`

## 🚀 Instalasi dan Menjalankan Aplikasi

1. Clone repository
   \`\`\`bash
   git clone https://github.com/username/learnhub.git
   cd learnhub/backend
   \`\`\`

2. Install dependencies
   \`\`\`bash
   npm install
   \`\`\`

3. Jalankan aplikasi
   \`\`\`bash

# Development mode dengan nodemon

npm run dev

# Production mode

npm start
\`\`\`

## 📌 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint              | Description       | Access  |
| ------ | --------------------- | ----------------- | ------- |
| POST   | `/auth/register`      | Register new user | Public  |
| POST   | `/auth/login`         | Login user        | Public  |
| GET    | `/auth/profile`       | Get user profile  | Private |
| GET    | `/auth/verify/:token` | Verify email      | Public  |

### 👥 User Routes

| Method | Endpoint     | Description    | Access      |
| ------ | ------------ | -------------- | ----------- |
| GET    | `/users`     | Get all users  | Admin       |
| GET    | `/users/:id` | Get user by ID | Admin/Owner |
| PUT    | `/users/:id` | Update user    | Admin/Owner |
| DELETE | `/users/:id` | Delete user    | Admin       |

### 📚 Playlist Routes

| Method | Endpoint                                | Description         | Access      |
| ------ | --------------------------------------- | ------------------- | ----------- |
| POST   | `/playlist/create`                      | Create new playlist | Private     |
| GET    | `/playlist/user`                        | Get user playlists  | Private     |
| PUT    | `/playlist/update-playlist/:playlistId` | Update playlist     | Owner/Admin |
| DELETE | `/playlist/delete-playlist/:playlistId` | Delete playlist     | Owner/Admin |

### 🛣️ Roadmap Routes

| Method | Endpoint                                          | Description        | Access      |
| ------ | ------------------------------------------------- | ------------------ | ----------- |
| POST   | `/playlist/create-roadmap/:playlistId`            | Create roadmap     | Owner/Admin |
| GET    | `/playlist/roadmap/:playlistId`                   | Get all roadmaps   | Private     |
| GET    | `/playlist/roadmap/:playlistId/:roadmapId`        | Get roadmap detail | Private     |
| PUT    | `/playlist/update-roadmap/:playlistId/:roadmapId` | Update roadmap     | Owner/Admin |
| DELETE | `/playlist/delete-roadmap/:playlistId/:roadmapId` | Delete roadmap     | Owner/Admin |

### 🎥 Video Routes

| Method | Endpoint                                                 | Description           | Access      |
| ------ | -------------------------------------------------------- | --------------------- | ----------- |
| GET    | `/playlist/search`                                       | Search YouTube videos | Private     |
| POST   | `/playlist/add-video/:playlistId/:roadmapId`             | Add video             | Owner/Admin |
| PUT    | `/playlist/update-progress/:playlistId/:roadmapId`       | Update progress       | Private     |
| DELETE | `/playlist/delete-video/:playlistId/:roadmapId/:videoId` | Delete video          | Owner/Admin |

## 🔒 Security Features

1. **Rate Limiting**:

   - Register: 5 requests/15 menit
   - Login: 5 requests/15 menit
   - API calls: 100 requests/15 menit

2. **Authentication**:

   - JWT token based
   - Token expires dalam 7 hari
   - Refresh token mechanism

3. **Authorization**:
   - Role-based access control
   - Owner/Admin permissions
   - Resource-level authorization

## 📊 Models

### User Model

\`\`\`javascript
{
name: String,
email: String,
password: String,
role: String,
isVerified: Boolean,
authType: String,
avatar: String
}
\`\`\`

### Playlist Model

\`\`\`javascript
{
title: String,
owner: ObjectId,
roadmaps: [{
title: String,
videos: [{
videoId: String,
title: String,
url: String,
progress: String
}]
}]
}
\`\`\`

## 🎯 Coming Soon Features

- Video/Audio transcription
- AI-powered Q&A from transcripts
- Quiz generation
- PDF export for roadmaps
- Collaborative learning features
- Social sharing capabilities

## 🤝 Contributing

Contributions are always welcome! Please create a pull request or issue for improvements or new features.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 👥 Team

- Septian Dwi Cahyo (Backend Developer)

## 📞 Contact

For questions and further information:

- Email: [septiandwica03@gmail.com](mailto:septiandwica03@gmail.com)
- GitHub: [@septiandwica](https://github.com/septiandwica)


---

Made with ❤️ by Septian Dwi Cahyo


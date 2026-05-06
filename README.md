Team Manager

A full-stack MERN project management and team collaboration platform built using React, Vite, Node.js, Express, and MongoDB.

Features
User Authentication
Team Collaboration
Task Management
Kanban Board
Project Tracking
Dashboard Analytics
Drag and Drop Tasks
Responsive UI
Toast Notifications
JWT Authentication
MongoDB Database Integration
Tech Stack
Frontend
React
Vite
React Router DOM
Framer Motion
Lucide React
Recharts
DnD Kit
Axios
Tailwind CSS
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
bcryptjs
dotenv
CORS
Project Structure
team-manager/
│
├── client/          # Frontend React App
├── server/          # Backend Express Server
│
├── README.md
Installation
Clone Repository
git clone https://github.com/Jaswanthi-Vemuri/team-manager.git
cd team-manager
Frontend Setup
cd client
npm install
Create .env File

Inside client/.env

VITE_API_URL=http://localhost:5000
Run Frontend
npm run dev

Frontend runs on:

http://localhost:5173
Backend Setup
cd server
npm install
Create .env File

Inside server/.env

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=teammanagersecret
Run Backend
npm run dev

Backend runs on:

http://localhost:5000
Required Dependencies
Frontend
npm install axios clsx date-fns framer-motion lucide-react react-router-dom react-hot-toast recharts @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
Backend
npm install express mongoose cors dotenv bcryptjs jsonwebtoken
npm install nodemon --save-dev
API Configuration

The frontend uses environment variables to connect with the backend.

Inside:

client/.env
VITE_API_URL=http://localhost:5000

For production:

VITE_API_URL=https://your-railway-url.up.railway.app
Deployment
Backend Deployment (Railway)
Steps
Push project to GitHub
Open Railway
Create New Project
Deploy from GitHub Repo
Select repository
Set Root Directory to:
server
Add environment variables:
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=teammanagersecret
Deploy backend
Generate public domain
Frontend Deployment (Vercel)
Steps
Open Vercel
Import GitHub repository
Set Root Directory:
client
Add Environment Variable:
VITE_API_URL=https://your-railway-url.up.railway.app
Build Command:
npm run build
Output Directory:
dist
Deploy
Available Scripts
Frontend
npm run dev
npm run build
Backend
npm run dev
npm start
Common Issues
Missing Dependencies

Run:

npm install
CORS Issues

Ensure backend contains:

app.use(cors())
MongoDB Connection Error
Check MongoDB Atlas credentials
Whitelist IP address
Verify connection string
Future Improvements
Real-time chat
Notifications
Team Invitations
File Uploads
Activity Logs
AI Task Suggestions
Calendar Integration
Author
Jaswanthi Vemuri

GitHub:

https://github.com/Jaswanthi-Vemuri
License

This project is for educational and portfolio purposes.

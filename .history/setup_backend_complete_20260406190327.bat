@echo off
setlocal enabledelayedexpansion

REM Create backend directory structure
echo Creating backend directory structure...
mkdir backend 2>nul
mkdir backend\src 2>nul
mkdir backend\src\models 2>nul
mkdir backend\src\routes 2>nul
mkdir backend\src\middleware 2>nul
mkdir backend\src\utils 2>nul
mkdir backend\uploads 2>nul

echo Backend directories created!

REM Create .gitkeep files to preserve empty directories
type nul > backend\.gitkeep 2>nul
type nul > backend\src\.gitkeep 2>nul
type nul > backend\src\models\.gitkeep 2>nul
type nul > backend\src\routes\.gitkeep 2>nul
type nul > backend\src\middleware\.gitkeep 2>nul
type nul > backend\src\utils\.gitkeep 2>nul
type nul > backend\uploads\.gitkeep 2>nul

REM Create package.json
(
echo {
echo   "name": "medigit-backend",
echo   "version": "1.0.0",
echo   "description": "Medical Records Management API",
echo   "main": "server.js",
echo   "type": "module",
echo   "scripts": {
echo     "start": "node server.js",
echo     "dev": "node --watch server.js",
echo     "test": "echo \"Error: no test specified\" ^&^& exit 1"
echo   },
echo   "keywords": ["medical", "records", "api"],
echo   "author": "",
echo   "license": "ISC",
echo   "dependencies": {
echo     "express": "^4.18.2",
echo     "mongoose": "^8.0.0",
echo     "bcryptjs": "^2.4.3",
echo     "jsonwebtoken": "^9.1.0",
echo     "dotenv": "^16.3.1",
echo     "multer": "^1.4.5-lts.1",
echo     "joi": "^17.11.0",
echo     "cors": "^2.8.5"
echo   },
echo   "devDependencies": {
echo     "nodemon": "^3.0.2"
echo   }
echo }
) > backend\package.json

echo package.json created!

REM Create .env.example
(
echo # MongoDB
echo MONGODB_URI=mongodb://localhost:27017/medigit
echo.
echo # JWT
echo JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
echo.
echo # Server
echo PORT=5000
echo NODE_ENV=development
echo.
echo # Frontend
echo FRONTEND_URL=http://localhost:5173
echo.
echo # File Upload
echo MAX_FILE_SIZE=10485760
echo UPLOAD_DIR=./uploads
) > backend\.env.example

echo .env.example created!

echo.
echo ✓ Backend directory structure created successfully!
echo.
echo Next steps:
echo 1. Navigate to the backend directory: cd backend
echo 2. Install dependencies: npm install
echo 3. Copy .env.example to .env: copy .env.example .env

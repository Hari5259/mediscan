# Backend Setup Instructions - Phase 1

## Overview
This document explains how to set up the backend for Medical Records Management.

## Files Created (Temporary)
The following temporary backend files have been created in the root directory. You need to organize them into the proper backend structure:

### Temporary Files Created:
- `backend_server_temp.js` → Move to `backend/server.js`
- `backend_user_model_temp.js` → Move to `backend/src/models/User.model.js`
- `backend_medical_record_model_temp.js` → Move to `backend/src/models/MedicalRecord.model.js`
- `backend_auth_middleware_temp.js` → Move to `backend/src/middleware/auth.js`
- `backend_upload_middleware_temp.js` → Move to `backend/src/middleware/upload.js`
- `backend_auth_routes_temp.js` → Move to `backend/src/routes/auth.js`

### Scripts Available:
- `create_backend.bat` - Windows batch script to create directory structure
- `create_backend_structure.bat` - Alternative Windows batch script
- `run_backend_setup.bat` - Setup runner
- `setup_backend_structure.js` - Node.js setup script (requires Node.js)

## Setup Steps

### Option A: Manual Setup (Recommended)
1. Create `backend` folder in the project root
2. Create subdirectories: `src`, `src/models`, `src/routes`, `src/middleware`, `src/utils`, `uploads`
3. Copy temporary files to their final locations:
   ```
   backend/
   ├── server.js                 (from backend_server_temp.js)
   ├── package.json              (already created)
   ├── .env.example              (already created)
   ├── .gitignore                (already created)
   ├── uploads/                  (empty directory)
   └── src/
       ├── models/
       │   ├── User.model.js                    (from backend_user_model_temp.js)
       │   └── MedicalRecord.model.js           (from backend_medical_record_model_temp.js)
       ├── routes/
       │   └── auth.js                          (from backend_auth_routes_temp.js)
       └── middleware/
           ├── auth.js                          (from backend_auth_middleware_temp.js)
           └── upload.js                        (from backend_upload_middleware_temp.js)
   ```

4. Navigate to `backend` directory:
   ```bash
   cd backend
   ```

5. Install dependencies:
   ```bash
   npm install
   ```

6. Create `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

7. Update `.env` with your configuration (especially `MONGODB_URI` and `JWT_SECRET`)

8. Start MongoDB (if not already running):
   ```bash
   # On Windows with MongoDB installed:
   mongod
   
   # Or use MongoDB Atlas (cloud):
   # Update MONGODB_URI in .env with your connection string
   ```

9. Start the server:
   ```bash
   npm start        # Production mode
   npm run dev      # Development mode with hot reload
   ```

### Option B: Automated Setup (Windows)
1. Run the batch script:
   ```cmd
   run_backend_setup.bat
   ```

2. Then manually copy the temporary files to their final locations

3. Continue with steps 5-9 above

### Option C: Node.js Automated Setup
1. Run the Node.js setup script:
   ```bash
   node setup_backend_structure.js
   ```

2. Manually copy temporary files to backend directories

3. Continue with steps 5-9 above

## Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/medigit
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/medigit

# JWT Configuration
JWT_SECRET=your_very_secure_secret_key_min_32_characters_long

# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads
```

**⚠️ IMPORTANT**: Change `JWT_SECRET` to a strong random value in production!

## MongoDB Setup

### Option 1: Local MongoDB
- Download and install MongoDB Community Edition: https://docs.mongodb.com/manual/installation/
- Start MongoDB service
- Connection string: `mongodb://localhost:27017/medigit`

### Option 2: MongoDB Atlas (Cloud - Recommended)
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string and update `MONGODB_URI` in `.env`
4. Whitelist your IP address

## Verification

After setup, verify the server is running:

```bash
# Terminal 1: Start the server
npm start

# Terminal 2: Test health endpoint
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-04-06T13:30:00.000Z"
}
```

## Next Steps

Once Phase 1 is complete (backend setup):

1. **Phase 2**: Implement remaining API endpoints (Medical Records CRUD)
2. **Phase 3**: Frontend integration with React
3. **Phase 4**: Testing and deployment

## File Descriptions

### server.js
Main Express application with:
- CORS configuration
- MongoDB connection
- Error handling middleware
- Health check endpoint
- Placeholder for route mounting

### Models

#### User.model.js
Mongoose schema for users with:
- Authentication fields (email, password, phone)
- User type differentiation (patient/doctor)
- Password hashing with bcryptjs
- Phone & email verification flags
- Specialization field for doctors

#### MedicalRecord.model.js
Mongoose schema for medical records with:
- Record type enum (X-Ray, CT Scan, Blood Test, etc.)
- File metadata (URL, name, size, type)
- Patient-Doctor relationships
- Status workflow (draft → submitted → approved)
- Sharing capability with multiple doctors
- Automatic timestamps and indexes

### Middleware

#### auth.js
JWT authentication utilities:
- `authenticateToken()` - Verify JWT token
- `authorizeRole()` - Role-based access control
- `generateToken()` - Create JWT token
- `generateRefreshToken()` - Create refresh token
- `verifyRefreshToken()` - Validate refresh token

#### upload.js
File upload utilities using Multer:
- File type validation (PDF, JPG, PNG)
- File size limits (10MB default)
- Secure filename generation
- Error handling
- File deletion utilities

### Routes

#### auth.js
Authentication endpoints:
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh-token` - Token refresh

## Troubleshooting

### "Cannot find module 'express'"
→ Run `npm install` in the backend directory

### "MongoDB connection error"
→ Ensure MongoDB is running or update MONGODB_URI in .env

### "Port 5000 is already in use"
→ Change PORT in .env or kill the process using port 5000

### "JWT verification failed"
→ Check JWT_SECRET matches on server and in token

## References

- Express.js: https://expressjs.com
- MongoDB: https://www.mongodb.com
- Mongoose: https://mongoosejs.com
- JWT: https://jwt.io
- Multer: https://github.com/expressjs/multer
- Joi: https://joi.dev


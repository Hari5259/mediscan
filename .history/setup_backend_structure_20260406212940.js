#!/usr/bin/env node
/**
 * Backend Setup Script for Medical Records Management
 * Run: node setup_backend_structure.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backendPath = path.join(__dirname, 'backend');
const dirs = [
  'backend',
  'backend/src',
  'backend/src/models',
  'backend/src/routes',
  'backend/src/middleware',
  'backend/src/utils',
  'backend/uploads',
];

console.log('📁 Creating backend directory structure...\n');

// Create directories
dirs.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✓ Created: ${dir}`);
  } else {
    console.log(`✓ Exists: ${dir}`);
  }
});

// Create package.json
const packageJson = {
  name: 'medigit-backend',
  version: '1.0.0',
  description: 'Medical Records Management API',
  main: 'server.js',
  type: 'module',
  scripts: {
    start: 'node server.js',
    dev: 'node --watch server.js',
    test: 'echo "Error: no test specified" && exit 1',
  },
  keywords: ['medical', 'records', 'api'],
  author: '',
  license: 'ISC',
  dependencies: {
    express: '^4.18.2',
    mongoose: '^8.0.0',
    bcryptjs: '^2.4.3',
    jsonwebtoken: '^9.1.0',
    dotenv: '^16.3.1',
    multer: '^1.4.5-lts.1',
    joi: '^17.11.0',
    cors: '^2.8.5',
  },
  devDependencies: {
    nodemon: '^3.0.2',
  },
};

fs.writeFileSync(
  path.join(backendPath, 'package.json'),
  JSON.stringify(packageJson, null, 2)
);
console.log('\n✓ Created: backend/package.json');

// Create .env.example
const envExample = `# MongoDB
MONGODB_URI=mongodb://localhost:27017/medigit

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Server
PORT=5000
NODE_ENV=development

# Frontend
FRONTEND_URL=http://localhost:5173

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads
`;

fs.writeFileSync(
  path.join(backendPath, '.env.example'),
  envExample
);
console.log('✓ Created: backend/.env.example');

// Create .gitignore
const gitignore = `node_modules/
.env
.env.local
.env.*.local
*.log
uploads/
.DS_Store
.idea/
.vscode/
`;

fs.writeFileSync(
  path.join(backendPath, '.gitignore'),
  gitignore
);
console.log('✓ Created: backend/.gitignore');

console.log('\n✅ Backend setup complete!');
console.log('\nNext steps:');
console.log('1. cd backend');
console.log('2. npm install');
console.log('3. Create .env from .env.example');
console.log('4. Start MongoDB');
console.log('5. npm start or npm run dev\n');

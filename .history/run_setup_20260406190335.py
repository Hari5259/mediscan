#!/usr/bin/env python3
import os
import json
import subprocess
import sys

# Define the backend directory structure
backend_path = r"C:\Users\HP\OneDrive\Desktop\medigit\backend"
src_path = os.path.join(backend_path, "src")
models_path = os.path.join(src_path, "models")
routes_path = os.path.join(src_path, "routes")
middleware_path = os.path.join(src_path, "middleware")
utils_path = os.path.join(src_path, "utils")
uploads_path = os.path.join(backend_path, "uploads")

# Create directories
print("Creating backend directory structure...")
for path in [backend_path, src_path, models_path, routes_path, middleware_path, utils_path, uploads_path]:
    os.makedirs(path, exist_ok=True)
    print(f"✓ Created {path}")

# Create .gitkeep files
print("\nCreating .gitkeep files...")
for path in [backend_path, src_path, models_path, routes_path, middleware_path, utils_path, uploads_path]:
    gitkeep_path = os.path.join(path, ".gitkeep")
    open(gitkeep_path, "a").close()
    print(f"✓ Created {gitkeep_path}")

# Create package.json
print("\nCreating package.json...")
package_json = {
    "name": "medigit-backend",
    "version": "1.0.0",
    "description": "Medical Records Management API",
    "main": "server.js",
    "type": "module",
    "scripts": {
        "start": "node server.js",
        "dev": "node --watch server.js",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": ["medical", "records", "api"],
    "author": "",
    "license": "ISC",
    "dependencies": {
        "express": "^4.18.2",
        "mongoose": "^8.0.0",
        "bcryptjs": "^2.4.3",
        "jsonwebtoken": "^9.1.0",
        "dotenv": "^16.3.1",
        "multer": "^1.4.5-lts.1",
        "joi": "^17.11.0",
        "cors": "^2.8.5"
    },
    "devDependencies": {
        "nodemon": "^3.0.2"
    }
}

package_json_path = os.path.join(backend_path, "package.json")
with open(package_json_path, "w") as f:
    json.dump(package_json, f, indent=2)
print(f"✓ Created {package_json_path}")

# Create .env.example
print("\nCreating .env.example...")
env_example = """# MongoDB
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
"""

env_example_path = os.path.join(backend_path, ".env.example")
with open(env_example_path, "w") as f:
    f.write(env_example)
print(f"✓ Created {env_example_path}")

print("\n✓ Backend directory structure created successfully!")
print("\nNext steps:")
print(f"1. Navigate to the backend directory: cd {backend_path}")
print("2. Install dependencies: npm install")
print("3. Copy .env.example to .env: copy .env.example .env")

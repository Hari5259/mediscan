@echo off
REM Create backend directory structure
mkdir backend 2>nul
mkdir backend\src 2>nul
mkdir backend\src\models 2>nul
mkdir backend\src\routes 2>nul
mkdir backend\src\middleware 2>nul
mkdir backend\src\utils 2>nul
mkdir backend\uploads 2>nul

echo Backend directory structure created!
echo Please run: cd backend && npm install

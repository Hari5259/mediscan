@echo off
setlocal enabledelayedexpansion

cd /d C:\Users\HP\OneDrive\Desktop\medigit

REM Create directory structure
echo Creating directory structure...
if not exist "frontend\src\components" mkdir "frontend\src\components"
if not exist "frontend\src\assets" mkdir "frontend\src\assets"
if not exist "frontend\public" mkdir "frontend\public"

echo Directory structure created!

REM Copy config files
echo.
echo Copying config files...
copy package.json frontend\
copy vite.config.js frontend\
copy index.html frontend\
copy tailwind.config.js frontend\
copy postcss.config.js frontend\
copy eslint.config.js frontend\
copy .gitignore frontend\.gitignore
copy README.md frontend\

REM Copy src files
echo.
echo Copying src files...
copy src\App.jsx frontend\src\
copy src\App.css frontend\src\
copy src\main.jsx frontend\src\
copy src\index.css frontend\src\

REM Copy components
echo.
echo Copying component files...
copy src\components\Login.jsx frontend\src\components\
copy src\components\Signup.jsx frontend\src\components\
copy src\components\Dashboard.jsx frontend\src\components\
copy src\components\Verification.jsx frontend\src\components\
copy src\components\Terms.jsx frontend\src\components\
copy src\components\Privacy.jsx frontend\src\components\

REM Copy assets
echo.
echo Copying assets...
copy src\assets\*.* frontend\src\assets\

REM Copy public files
echo.
echo Copying public files...
copy public\*.* frontend\public\

echo.
echo ============================================================
echo Setup Complete!
echo ============================================================
echo.
echo Frontend directory structure:
tree frontend /L

echo.
echo Next steps:
echo 1. cd frontend
echo 2. npm install
echo 3. npm run dev

pause

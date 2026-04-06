@echo off
REM Create backend directory structure
echo Creating backend directory structure...
mkdir backend 2>nul
mkdir backend\src 2>nul
mkdir backend\src\models 2>nul
mkdir backend\src\routes 2>nul
mkdir backend\src\middleware 2>nul
mkdir backend\src\utils 2>nul
mkdir backend\uploads 2>nul

REM Create .gitkeep files
echo. > backend\.gitkeep
echo. > backend\src\.gitkeep
echo. > backend\src\models\.gitkeep
echo. > backend\src\routes\.gitkeep
echo. > backend\src\middleware\.gitkeep
echo. > backend\src\utils\.gitkeep
echo. > backend\uploads\.gitkeep

echo Backend directory structure created!

REM Now run the Python script to create package.json and .env.example
python setup_backend.py

REM Install npm dependencies
echo Installing npm dependencies...
cd backend
npm install

echo.
echo Setup complete!

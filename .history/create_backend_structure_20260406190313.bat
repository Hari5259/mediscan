@echo off
REM Create backend directory structure
mkdir backend\src\models
mkdir backend\src\routes
mkdir backend\src\middleware
mkdir backend\src\utils
mkdir backend\uploads

REM Create .gitkeep files to track directories
type nul > backend\.gitkeep
type nul > backend\src\models\.gitkeep
type nul > backend\src\routes\.gitkeep
type nul > backend\src\middleware\.gitkeep
type nul > backend\src\utils\.gitkeep
type nul > backend\uploads\.gitkeep

echo Backend directory structure created successfully!

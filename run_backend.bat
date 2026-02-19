@echo off
REM ========================================
REM Portfolio Backend Quick Start Script
REM ========================================
REM
REM This script helps you quickly set up and run the Portfolio backend
REM

echo.
echo ========================================
echo   Portfolio Backend Setup Script
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed.
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js detected: 
node --version
echo.

REM Navigate to backend directory
cd /d "%~dp0backend"

if not exist "package.json" (
    echo ERROR: package.json not found in backend directory
    pause
    exit /b 1
)

echo.
echo Step 1: Installing dependencies...
echo.
call npm install

if errorlevel 1 (
    echo ERROR: npm install failed
    pause
    exit /b 1
)

echo.
echo ✓ Dependencies installed successfully!
echo.

REM Check if .env exists
if not exist ".env" (
    echo.
    echo Step 2: Setting up .env configuration...
    echo.
    
    if exist ".env.example" (
        copy ".env.example" ".env" >nul
        echo ✓ Created .env from template
        echo.
        echo !!! IMPORTANT !!!
        echo Please edit .env file with your settings:
        echo   - EMAIL_USER: your gmail address
        echo   - EMAIL_PASSWORD: your app password (not regular password)
        echo.
        echo To get Gmail App Password:
        echo   1. Go to myaccount.google.com/apppasswords
        echo   2. Select Mail, Windows Computer
        echo   3. Copy 16-character password
        echo   4. Paste in .env as EMAIL_PASSWORD
        echo.
        pause
    )
) else (
    echo ✓ .env file already exists
)

echo.
echo ========================================
echo   🚀 Starting Backend Server
echo ========================================
echo.
echo Server running on: http://localhost:5000
echo API Health Check: http://localhost:5000/api/health
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start server
call npm run dev

pause

@echo off
REM ========================================
REM Portfolio Frontend Quick Start
REM ========================================

echo.
echo ========================================
echo   Opening Portfolio in Browser...
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo WARNING: Python not found. Opening index.html directly...
    start index.html
    exit /b 0
)

echo ✓ Python detected: 
python --version

echo.
echo Starting HTTP server on port 8000...
echo.
echo Portfolio URL: http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.

timeout /t 2 >nul

REM Start Python HTTP server
python -m http.server 8000

pause

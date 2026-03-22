@echo off
cd /d "C:\.temp_private\ubterzioglude"
echo Starting server...
echo.
python -m http.server 8080

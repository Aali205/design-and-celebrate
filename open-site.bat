@echo off
rem Starts a small local server (needed for the page-to-page animations) and opens the site.
cd /d "%~dp0"
start "Design & Celebrate server" /min python -m http.server 8790
timeout /t 1 >nul
start "" http://localhost:8790/

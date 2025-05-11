@echo off
title Push to GitHub
color 0A

echo ================================================
echo          PUSHING SITE TO GITHUB PAGES
echo ================================================

:: Check Git initialization
if not exist ".git" (
    echo [1/5] Git repository initialization...
    git init
    git remote add origin https://github.com/SadreevJ/connect.dev.git
) else (
    echo [1/5] Git repository already initialized.
)

:: Add all files
echo [2/5] Adding all files...
git add .

:: Create commit
echo [3/5] Creating commit...
git commit -m "Website update %DATE% %TIME%"

:: Push to GitHub
echo [4/5] Pushing to GitHub...
git push -f origin master:main

echo [5/5] Done!
echo ================================================
echo Site available at:
echo https://sadreevj.github.io/connect.dev/
echo ================================================
echo.
pause

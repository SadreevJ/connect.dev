@echo off
title Push to GitHub with Clean Repository
color 0A

echo ================================================
echo     CLEAN PUSH TO GITHUB PAGES
echo ================================================

:: Check Git initialization
if not exist ".git" (
    echo [1/7] Git repository initialization...
    git init
    git remote add origin https://github.com/SadreevJ/connect.dev.git
) else (
    echo [1/7] Git repository already initialized.
)

:: Create orphan branch to clean repository
echo [2/7] Creating orphan branch to clean repository...
git checkout --orphan temp_branch

:: Add all files with .gitignore applied
echo [3/7] Adding files (excluding files in .gitignore)...
git add .

:: Create commit
echo [4/7] Creating commit...
git commit -m "Clean website update %DATE% %TIME%"

:: Delete the main branch
echo [5/7] Removing old main branch...
git branch -D main

:: Rename the current branch to main
echo [6/7] Renaming current branch to main...
git branch -m main

:: Force push to GitHub
echo [7/7] Force pushing to GitHub...
git push -f origin main

echo Done!
echo ================================================
echo Repository has been cleaned and site is available at:
echo https://sadreevj.github.io/connect.dev/
echo ================================================
echo.
pause

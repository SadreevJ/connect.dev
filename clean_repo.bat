@echo off
title Clean Repository Files
color 0A

echo ================================================
echo     REMOVING EXCLUDED FILES FROM REPOSITORY
echo ================================================

:: Удаляем файлы из индекса Git, но оставляем их локально
echo [1/3] Удаляем архивы и PS1 файлы из Git индекса...
git rm --cached *.rar
git rm --cached *.ps1

:: Создаем коммит
echo [2/3] Создаем коммит с удаленными файлами...
git commit -m "Remove archives and PowerShell scripts from repository"

:: Отправляем изменения на сервер
echo [3/3] Отправляем изменения...
git push origin main

echo ================================================
echo Готово! Файлы удалены из репозитория, но сохранены локально.
echo Репозиторий доступен на:
echo https://sadreevj.github.io/connect.dev/
echo ================================================
echo.
pause

@echo off
title DocuMotion Studio - Serwer Aplikacji

cd /d "%~dp0"

echo ================================================================
echo    DocuMotion Studio - Generator Nakladek Wideo
echo    Remotion + Next.js (Apple ProRes 4444 Alpha)
echo ================================================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [BLAD] Node.js nie zostal znaleziony w systemie!
    echo Zainstaluj Node.js ze strony: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

if not exist "node_modules\" (
    echo [INFO] Wykryto brak folderu node_modules. Instalowanie pakietow npm...
    call npm install
    if %errorlevel% neq 0 (
        echo [BLAD] Instalacja zaleznosci nie powiodla sie!
        pause
        exit /b 1
    )
)

echo [1/2] Uruchamianie serwera Next.js...
echo [2/2] Otwieranie przegladarki pod adresem: http://localhost:3000
echo.
echo Aby zatrzymac aplikacje, nacisnij Ctrl + C w tym oknie.
echo ================================================================
echo.

start "" "http://localhost:3000"

call npm run dev

if %errorlevel% neq 0 (
    echo.
    echo [BLAD] Aplikacja zostala zatrzymana lub wystapil blad.
    pause
)

@echo off
setlocal enabledelayedexpansion





















































exit /b 0endlocal:endgoto revealping -n 2 127.0.0.1>nulecho Opening "%name[%sel%]%"...start "" "%target%")    goto reveal    pause    echo Invalid selection.if not defined target (set "target=!file[%sel%]!"for /f "tokens=*" %%N in ("%sel%") do set sel=%%Nrem normalize selection to integer (strip spaces)if /i "%sel%"=="R" goto mainset /p sel=Enter number to open (or R to return): echo.)    goto main    pause    echo Put your PDF/JPG/PNG files inside the "certs" folder next to this script.    echo No certificates found in "%CERT_DIR%".if "%i%"=="0" ()    echo !i!) %%F    set "name[!i!]=%%F"    set "file[!i!]=%CERT_DIR%%%F"    set /a i+=1for /f "delims=" %%F in ('dir /b /a-d "%CERT_DIR%"') do (set i=0echo.echo Available Certifications:cls:reveal
:: Reveal available certificate files and let user open onegoto mainpauseecho Invalid choice.if "%choice%"=="2" goto endif "%choice%"=="1" goto revealset /p choice=Choose an option [1-2]: echo 2) Exitecho 1) Reveal Certificationsecho.echo Portfolio - Certificates (hidden by default)cls
:mainif not exist "%CERT_DIR%" mkdir "%CERT_DIR%"set "CERT_DIR=%~dp0certs":: Directory for certificates (relative to this script)
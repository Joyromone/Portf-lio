@echo off
echo Verificando situacao do repositorio...
git status
echo.
echo Forcando adicionar pasta assets...
git add assets/ -f
git add assets/* -f
git add .
git status
echo.
echo Fazendo commit...
git commit -m "adiciona pasta assets com imagens"
echo.
echo Fazendo push...
git push
echo.
echo PRONTO! Aguarde 1 minuto e acesse joyceromone.com.br
pause

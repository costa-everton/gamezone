@echo off
echo 🐘 Instalando PostgreSQL 18.0.2...
echo ====================================
echo.

echo 1️⃣ Criando pasta de instalação...
mkdir C:\PostgreSQL 2>nul
echo ✅ Pasta criada

echo 2️⃣ Copiando arquivos...
xcopy "C:\Users\user\Downloads\postgresql-18.0-2-windows-x64-binaries\pgsql" "C:\PostgreSQL\pgsql" /E /I /Q
echo ✅ Arquivos copiados

echo 3️⃣ Adicionando ao PATH...
setx PATH "%PATH%;C:\PostgreSQL\pgsql\bin" /M
echo ✅ PATH atualizado

echo 4️⃣ Criando usuário postgres...
net user postgres /add 2>nul
net localgroup administrators postgres /add 2>nul
echo ✅ Usuário criado

echo 5️⃣ Inicializando banco de dados...
cd C:\PostgreSQL\pgsql
bin\initdb.exe -D data -U postgres -W
echo ✅ Banco inicializado

echo 6️⃣ Iniciando PostgreSQL...
bin\pg_ctl.exe -D data -l logfile start
echo ✅ PostgreSQL iniciado

echo.
echo 🎉 PostgreSQL instalado com sucesso!
echo.
echo 🔑 Credenciais:
echo    - Usuário: postgres
echo    - Senha: (a que você definiu)
echo    - Porta: 5432
echo.
echo 🚀 Para testar:
echo    C:\PostgreSQL\pgsql\bin\psql.exe -U postgres -h localhost
echo.
echo ⚠️  IMPORTANTE: Reinicie o terminal após a instalação!
echo.
pause

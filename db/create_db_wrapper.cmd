@echo off
REM simple dos script to execute the sql
echo "SCRIPT INFO: Running local database..."

set	HOST_NAME=localhost
set 	PORT_NUMBER=5432
set	DATABASE_NAME=ajsjee
set	USER_NAME=postgres
set 	SQL_SCRIPT=create_db.sql

REM determine present working directory
if exist db\%SQL_SCRIPT% cd db
set CURRENT_DIR=%cd%

for /f "delims=|" %%a in ('dir /B /S create_db.sql') do psql  -h %HOST_NAME% -p %PORT_NUMBER% -d %DATABASE_NAME% -U %USER_NAME% -f %%a -v FILE_PATH=%CURRENT_DIR%/ -v TABLE_OWNER=%USER_NAME%

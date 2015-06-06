#!/bin/bash -e
#===============================================================================
#       
#       
#		Author: Mikael Gulapa
#
#===============================================================================

CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SERVER__RUN_FLAG=$1



if [ "${SERVER__RUN_FLAG}" == "Y" ]; then
	echo "SCRIPT INFO: Running Heroku database..."

	echo "[$2] [$3] [$4] [$5]"

	HOST_NAME=$2
	PORT_NUMBER=$3
	DATABASE_NAME=$4
	USER_NAME=$5
else
	echo "SCRIPT INFO: Running local database..."
	HOST_NAME="localhost"
	PORT_NUMBER="5432"
	DATABASE_NAME="ajsjee"
	USER_NAME="postgres"
fi

export SSLMODE=required

#psql "jdbc:postgresql://ec2-54-225-106-211.compute-1.amazonaws.com:5432/dc0d7652o2mc2n?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory"
psql -h ${HOST_NAME} -p ${PORT_NUMBER} -d ${DATABASE_NAME} -U ${USER_NAME} -f ${CURRENT_DIR}/alter_db.sql -v FILE_PATH=${CURRENT_DIR}/ -v TABLE_OWNER=${USER_NAME}